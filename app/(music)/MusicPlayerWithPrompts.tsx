import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, } from "react-native";
import React, { useState, useMemo, useEffect, useRef,  } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as musicAPI from "../../endpoints/musicEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import { useAudioPlayer, AudioPlayer } from "expo-audio"; // Import AudioPlayer type
import { CampaignPrompt } from "@/types/musicTypes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TextTicker from "react-native-text-ticker";
import icons from "@/constants/icons";
import { authInstance } from "@/utils/apiService";
import { getSpotifyAudioUrl, getYouTubeAudioUrl } from "@/helper/musicHelper";
import useDataMutation from "@/hooks/useEndpointMutation";
import { formatPlays } from "@/utils/Format";
import { useAuth } from "@/providers/AuthContext";
// import { trackSongPlay } from "../../endpoints/musicEndpoints";

export default function MusicPlayerWithPrompts() {
  const router = useRouter();
  const params = useLocalSearchParams();
    const { user } = useAuth();

  // Song history for next/previous navigation
  const [songHistory, setSongHistory] = useState<string[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [countLikes, setCountLikes] = useState(0);
  const [countDislikes, setCountDislikes] = useState(0);
  const [dislikes, setDislikes] = useState<Record<string, boolean>>({});
  const [isSubmittingReaction, setIsSubmittingReaction] = useState(false);

const [followedArtist, setFollowedArtist] = useState(false);
const [isFollowing, setIsFollowing] = useState(false);

  const { data, isLoading, error } = useEndpointQuery({
    queryFn: () => musicAPI.getSongByIdIncludePrompts(params.songId as string),
    queryKey: [`fetch song, ${params.songId}`],
    enabled: !!params.songId,
  });

  const song = useMemo(() => {
    return (
      data?.data?.data || {
        uuid: "",
        title: "Loading...",
        artist: { name: "Loading..." },
        artworkUrl: null,
        audioEndpoint: null,
        duration: 195,
        campaigns: [],
      }
    );
  }, [data]);

  // Track song history
  useEffect(() => {
    if (song.uuid && params.songId) {
      setSongHistory((prev) => {
        const newHistory = prev.filter((id) => id !== params.songId);
        newHistory.push(params.songId as string);
        return newHistory.slice(-20);
      });
      setCurrentHistoryIndex((prev) => prev + 1);
    }
  }, [params.songId, song.uuid]);


  // Load reactions from backend
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const response = await authInstance.get(
          `/songs/reactions/${song.uuid}`
        );
        if (response.data?.data) {
          setLikes(response.data.data.liked ? { [song.uuid]: true } : {});
          setDislikes(response.data.data.disliked ? { [song.uuid]: true } : {});
          setCountLikes(response.data.data.totalLikes || 0);
          setCountDislikes(response.data.data.totalDislikes || 0);
        }
      } catch (error) {
        console.log(error, "Could not load reactions");
      }
    };

    if (song.uuid) {
      loadReactions(); 
      
    }
  }, [song.uuid, isSubmittingReaction]);

  const handleLike = async () => {
    setIsSubmittingReaction(true);
    try {
      if (dislikes[song.uuid]) {
        setDislikes((prev) => {
          const newState = { ...prev };
          delete newState[song.uuid];
          return newState;
        });
      }

      const isLiked = likes[song.uuid];
      setLikes((prev) => ({
        ...prev,
        [song.uuid]: !isLiked,
      }));

      await authInstance.post(`/songs/reactions/${song.uuid}`, {
        type: isLiked ? "remove" : "like",
      });  
    } catch (error) {
      console.error("Error saving reaction:", error);
    } finally {
      setIsSubmittingReaction(false);
    }
  };

  const handleDislike = async () => {
    setIsSubmittingReaction(true);
    try {
      if (likes[song.uuid]) {
        setLikes((prev) => {
          const newState = { ...prev };
          delete newState[song.uuid];
          return newState;
        });
      }

      const isDisliked = dislikes[song.uuid];
      setDislikes((prev) => ({
        ...prev,
        [song.uuid]: !isDisliked,
      }));

      await authInstance.post(`/songs/reactions/${song.uuid}`, {
        type: isDisliked ? "remove" : "dislike",
      });
    } catch (error) {
      console.error("Error saving reaction:", error);
    } finally {
      setIsSubmittingReaction(false);
    }
  };

  // handle follow artist


  const handleFollowArtist = async () => {
  console.log(song.artist, "Artist to follow/unfollow");
  if (!song?.artist) return;
  setIsFollowing(true);
  try {
    const res = await authInstance.post(`/songs/follow-artist/${song.artist.uuid}` );
    setFollowedArtist((prev) => !prev);

    // Optional: you can also read message
    console.log(res.data.message);
  } catch (error) {
    alert("Error following/unfollowing artist");
    console.error("Follow/unfollow error:", error);
  } finally {
    setIsFollowing(false);
  }
};
  
  useEffect(() => {
    const getFollowStatus = async () => {
      if (!song?.artist?.uuid) return;
       if (song?.artist?.uuid === user?.uuid) return;

      try {
        const res = await authInstance.get(
          `/songs/follow-status/${song.artist.uuid}`
        );
        setFollowedArtist(res.data.data.isFollowing); 
      } catch (error) {
        console.error(error);
      }
    };

    getFollowStatus();
  }, [song?.artist, user?.uuid]);



  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ✅ Use ref to store player instance
  const playerRef = useRef<AudioPlayer | null>(null);

  // Process audio/video URL based on platform
  useEffect(() => {
    const processUrl = async () => {
      setStreamError(null);
      setIsProcessing(true);

      try {
        // Case 1: Direct Cloudinary upload - use streamUrl directly
        if (song.streamUrl && !song.externalPlatform) {
          console.log("✅ Using direct Cloudinary URL");
          setProcessedUrl(song.streamUrl);
          setIsAudio(true);
          setIsProcessing(false);
          return;
        }

        // Case 2: YouTube - fetch audio URL from backend
        if (song.externalPlatform === "youtube" && song.externalId) {
          console.log("🎥 Processing YouTube content:", song.externalId);
          const result = await getYouTubeAudioUrl(song.externalId);

          if (result.success && result.data?.audioUrl) {
            console.log("✅ YouTube audio URL obtained");
            setProcessedUrl(result.data.audioUrl);
            setIsAudio(true);
          } else {
            setStreamError(result.error || "Failed to load YouTube audio");
          }

          setIsProcessing(false);
          return;
        }

        // Case 3: Spotify - fetch audio URL from backend
        if (song.externalPlatform === "spotify" && song.externalId) {
          console.log("🎵 Processing Spotify content:", song.externalId);

          const result = await getSpotifyAudioUrl(song.externalId);

          if (result.success && result.data?.audioUrl) {
            console.log("✅ Spotify audio URL obtained (30-second preview)");
            setProcessedUrl(result.data.audioUrl);
            setIsAudio(true);
          } else {
            setStreamError(
              result.error ||
                "Failed to load Spotify track. Premium may be required."
            );
          }

          setIsProcessing(false);
          return;
        }

        // Case 4: Use audioEndpoint if provided (fallback)
        if (song.audioEndpoint) {
          console.log("📡 Using audioEndpoint:", song.audioEndpoint);

          try {
            const response = await authInstance.get(song.audioEndpoint);
            const audioUrl = response.data?.data?.audioUrl;

            if (audioUrl) {
              console.log("✅ Audio URL obtained from endpoint");
              setProcessedUrl(audioUrl);
              setIsAudio(true);
            } else {
              setStreamError("Could not extract audio URL from server");
            }
          } catch (error: any) {
            console.error("❌ Endpoint fetch error:", error);
            setStreamError("Failed to fetch audio from server");
          }
        } else {
          setStreamError("No audio source available for this song");
        }
      } catch (error: any) {
        console.error("❌ General processing error:", error);
        setStreamError("Failed to process audio");
      } finally {
        setIsProcessing(false);
      }
    };

    if (song.uuid) {
      processUrl();
    }
  }, [
    song.streamUrl,
    song.externalPlatform,
    song.externalId,
    song.audioEndpoint,
    song.uuid,
  ]);

  // ✅ Initialize player when processedUrl changes
  const player = useAudioPlayer(processedUrl || "");

  // ✅ Update playerRef when player changes
  useEffect(() => {
    playerRef.current = player;

    // Set duration when player is ready
    if (player.duration) {
      setDuration(player.duration);
    }
  }, [player]);

  // ✅ Fixed interval for currentTime updates
  useEffect(() => {
    if (!isAudio || !processedUrl) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.currentTime || 0);
        if (playerRef.current.duration) {
          setDuration(playerRef.current.duration);
        }
      }
    }, 100); /// it can be in 1000 ms for less frequent updates

    return () => clearInterval(interval);
  }, [isAudio, processedUrl]);

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  const campaignPrompts: CampaignPrompt[] = song.campaigns || [];

  // PLAYBACK TRACKING STATE
  const [lastTrackedTime, setLastTrackedTime] = useState(0);
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTrackedInitialPlay = useRef(false);

  const { mutate: trackPlay } = useDataMutation({
    mutationFn: (payload: { songId: string; durationListened: number }) =>
      musicAPI.trackSongPlay(payload),
    mutationKey: ["track song playback"],
  });

  // Function to track playback
  const trackPlayback = (currentSeconds: number) => {
    if (!song.uuid || !player.playing) return;

    const durationListened = Math.floor(currentSeconds);

    console.log(`📊 Tracking playback at ${durationListened}s`);

    trackPlay(
      {
        songId: song.uuid,
        durationListened,
      },
      {
        onSuccess: (res) => {
          console.log(
            `✅ Playback tracked at ${durationListened}s:`,
            res?.data
          );
          setLastTrackedTime(durationListened);
        },
        onError: (err: any) => {
          console.error(
            `❌ Failed to track playback at ${durationListened}s:`,
            err
          );
        },
      }
    );
  };

  // Track playback at intervals (1s, then every 10s)
  useEffect(() => {
    // Clear any existing interval
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }

    // Only track if player is playing and we have a valid song
    if (!player.playing || !song.uuid || !processedUrl) {
      hasTrackedInitialPlay.current = false;
      return;
    }

    // Track initial play at 1 second
    if (!hasTrackedInitialPlay.current) {
      const initialTimeout = setTimeout(() => {
        if (player.playing && player.currentTime >= 1) {
          trackPlayback(player.currentTime);
          hasTrackedInitialPlay.current = true;
        }
      }, 1000);

      return () => clearTimeout(initialTimeout);
    }

    // Track every 10 seconds after initial play
    trackingIntervalRef.current = setInterval(() => {
      const currentSeconds = Math.floor(player.currentTime);
      
      // Only track if we've progressed at least 10 seconds since last track
      if (currentSeconds - lastTrackedTime >= 10) {
        trackPlayback(currentSeconds);
      }
    }, 10000); // Check every 10 seconds

    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, [player.playing, song.uuid, processedUrl, lastTrackedTime, player.currentTime]);
 
  // Track when song ends
  useEffect(() => {
    if (!player.playing || !song.uuid) return;

    // Check if song has ended (within 1 second of duration)
    const isNearEnd = duration > 0 && currentTime >= duration - 1;

    if (isNearEnd && lastTrackedTime < duration) {
      console.log("🎵 Song ended, tracking final playback");
      trackPlayback(duration);
    }
  }, [currentTime, duration, player.playing, song.uuid, lastTrackedTime]);

  // Reset tracking when song changes
  useEffect(() => {
    setLastTrackedTime(0);
    hasTrackedInitialPlay.current = false;

    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
  }, [song.uuid]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, []);

  const playPauseAudio = () => {
    if (!processedUrl || streamError || !isAudio) return;

    if (player.playing) {
      player.pause();
    } else {
      player.play();
   
    }
  }; 

  const skipForward = async () => {
    if (!processedUrl || streamError) return;

    // console.log("⏭️ Fetching random song...");
    try {
      const response = await authInstance.get("/songs/random-song");   
      const randomSong = response.data?.data;

      if (randomSong?.uuid) {
        // console.log("✅ Random song fetched:", randomSong.title);
        if (player.playing) {
          player.pause();
        }
        router.push(
          `/(music)/MusicPlayerWithPrompts?songId=${randomSong.uuid}`
        );
      }
    } catch (error) {
      console.error("❌ Error fetching random song:", error);
    }
  };

  const skipBackward = async () => {
    if (!processedUrl || streamError) return;

    console.log("⏮️ Playing previous song...");
    if (currentHistoryIndex > 0) {
      const previousSongId = songHistory[currentHistoryIndex - 1];
      setCurrentHistoryIndex((prev) => prev - 1);
      if (player.playing) {
        player.pause();
      }
      router.push(`/(music)/MusicPlayerWithPrompts?songId=${previousSongId}`);
    } else {
      console.log("No previous songs in history");
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Rest of your component code remains the same...
  // (handleAnswer, handleTextAnswer, handleSubmit, renderPrompt functions)

  const handleAnswer = ( promptUuid: string, optionUuid: string, allowMultiple: boolean ) => {
    setAnswers((prev) => {
      const current = prev[promptUuid] || [];
      if (allowMultiple) {
        if (current.includes(optionUuid)) {
          return {
            ...prev,
            [promptUuid]: current.filter((uuid) => uuid !== optionUuid),
          };
        } else {
          return { ...prev, [promptUuid]: [...current, optionUuid] };
        }
      } else {
        return { ...prev, [promptUuid]: [optionUuid] };
      }
    });
  };

  const handleTextAnswer = (promptUuid: string, text: string) => {
    setTextAnswers((prev) => ({
      ...prev,
      [promptUuid]: text,
    }));
  };

  const handleSubmit = async () => {
    const surveyResponses = {
      songId: params.songId,
      answers: answers,
      textAnswers: textAnswers,
      campaignId: campaignPrompts[0]?.campaignId || null,
    };
    console.log("Survey responses:", surveyResponses);    

    try {
      await authInstance.post("/songs/survey-responses", surveyResponses);
      console.log("✅ Survey submitted successfully");
    } catch (error) {
      console.error("❌ Error submitting survey:", error);
    }

    // if (isAudio && player.playing) {
    //   player.pause();
    // }
    // router.back();
  };

  const renderPrompt = (prompt: CampaignPrompt) => {
    const selectedAnswers = answers[prompt.uuid] || [];
    const hasOptions = prompt.options && prompt.options.length > 0;

    return (
      <View key={prompt.uuid} className="bg-primary rounded-3xl p-5 mb-4">
        <Text className="text-white font-semibold text-base mb-4">
          {prompt.question} <Text className="text-red-500"> *</Text>
        </Text>

        {!hasOptions ? (
          <TextInput
            className="bg-neutral-800 rounded-2xl p-4 min-h-[100px] text-white text-sm"
            placeholder="Type your answer here..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={textAnswers[prompt.uuid] || ""}
            onChangeText={(text) => handleTextAnswer(prompt.uuid, text)}
          />
        ) : (
          <>
            {prompt.options.map((option) => {
              const isSelected = selectedAnswers.includes(option.uuid);
              const isMultiple = prompt.allow_multiple_choice;

              return (
                <TouchableOpacity
                  key={option.uuid}
                  onPress={() =>
                    handleAnswer(prompt.uuid, option.uuid, isMultiple)
                  }
                  className="flex-row items-center mb-3"
                >
                  <View
                    className={`w-5 h-5 ${
                      isMultiple ? "rounded" : "rounded-full"
                    } border-2 mr-3 items-center justify-center ${
                      isSelected
                        ? "border-secondary bg-secondary"
                        : "border-black bg-black"
                    }`}
                  >
                    {isSelected && (
                      <View
                        className={`w-2.5 h-2.5 ${
                          isMultiple ? "rounded-sm" : "rounded-full"
                        } bg-black`}
                      />
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-white text-base">
                      {option.option}
                    </Text>
                    {option.description && (
                      <Text className="text-gray-400 text-xs mt-1">
                        {option.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-xl mb-6">Failed to load song</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-secondary px-6 py-3 rounded-xl"
        >
          <Text className="text-black font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <LinearGradient
        colors={["#8B0000", "#000000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.4 }}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header - same as before */}
          <View className="flex-row gap-2 px-5 pt-12 py-20 bg-primary">
            <TouchableOpacity
              onPress={() => {
                if (isAudio && player.playing) player.pause();
                router.back();
              }}
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center">
              <Text className="text-white font-[400px] text-base">
                {song.title.length > 15 ? (
                  <TextTicker
                    style={{ color: "white", fontWeight: "400" }}
                    duration={5000}
                    loop
                    bounce={false}
                    repeatSpacer={50}
                    marqueeDelay={1000}
                  >
                    {song.title}
                  </TextTicker>
                ) : (
                  <Text className="text-white font-semibold text-base">
                    {song.title}
                  </Text>
                )}
              </Text>
            </View>
            {song?.artist?.uuid !== user?.uuid && (
              <TouchableOpacity
                onPress={handleFollowArtist}
                disabled={isFollowing}
                className="px-4 py-2 flex-row justify-center bg-accent rounded-lg"
              >
                <Text className="text-white font-semibold">
                  {followedArtist ? (
                    <>
                      <FontAwesome name="check" size={16} color="white" />{" "}
                      Following
                    </>
                  ) : (
                    <>
                      Follow{" "}
                      <FontAwesome name="plus-circle" size={18} color="white" />
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Error and Loading states */}
          {streamError && (
            <View className="mx-5 mb-4 mt-2 p-4 bg-red-900/50 rounded-xl border border-red-500">
              <View className="flex-row items-start">
                <Ionicons name="alert-circle" size={20} color="#EF4444" />
                <View className="flex-1 ml-3">
                  <Text className="text-red-300 text-sm font-semibold mb-1">
                    Playback Error
                  </Text>
                  <Text className="text-red-200 text-xs">{streamError}</Text>
                </View>
              </View>
            </View>
          )}

          {isProcessing && (
            <View className="mx-5 mb-4 p-4 bg-blue-900/50 rounded-xl border border-blue-500">
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#60A5FA" />
                <Text className="text-blue-300 text-sm ml-3">
                  Loading media...
                </Text>
              </View>
            </View>
          )}

          {/* Album Art */}
          <View className="w-full items-center mb-10">
            <Image
              source={
                song.artworkUrl
                  ? { uri: song.artworkUrl }
                  : require("@/assets/images/content/rema1.jpg")
              }
              className="w-full h-[210px]"
              resizeMode="cover"
            />
          </View>

          {/* Player Controls */}
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-white font-bold text-2xl mb-1">
                  {song.title}
                </Text>
                <Text className="text-gray-400 text-base">
                  {song.artist?.name || "Unknown Artist"}
                </Text>
              </View>
              <View className="flex-row items-center justify-center bg-primary px-3 py-4 rounded-xl">
                <TouchableOpacity
                  onPress={handleLike}
                  disabled={isSubmittingReaction}
                  className="flex-row items-center gap-1"
                >
                  <MaterialIcons
                    name="thumb-up"
                    color={likes[song.uuid] ? "#40E0D0" : "#5F6368"}
                    size={18}
                  />
                  <Text className="text-white text-[16px]">
                    {formatPlays(countLikes)}{" "}
                  </Text>
                </TouchableOpacity>

                <Text className="text-white mx-3 text-[16px]">|</Text>

                <TouchableOpacity
                  onPress={handleDislike}
                  disabled={isSubmittingReaction}
                  className="flex-row items-center gap-1"
                >
                  <MaterialIcons
                    name="thumb-down"
                    color={dislikes[song.uuid] ? "#EF4444" : "#5F6368"}
                    size={18}
                  />
                  <Text className="text-white text-[16px]">
                    {formatPlays(countDislikes)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Progress bar - only show for audio */}
            {isAudio && processedUrl && (
              <View className="mb-2 mt-4">
                <View className="h-1 bg-accent rounded-full overflow-hidden">
                  <View
                    className="h-full bg-white rounded-full"
                    style={{
                      width: `${
                        duration > 0 ? (currentTime / duration) * 100 : 0
                      }%`,
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-icongray text-xs">
                    {formatTime(currentTime)}
                  </Text>
                  <Text className="text-icongray text-xs">
                    {formatTime(duration)}
                  </Text>
                </View>
              </View>
            )}

            {/* Playback Controls */}
            <View className="flex-row justify-center items-center gap-8 mb-6">
              <TouchableOpacity
                onPress={skipBackward}
                disabled={!processedUrl || !!streamError}
              >
                <Ionicons
                  name="play-back"
                  size={32}
                  color={!processedUrl || streamError ? "#666" : "#D9D9D9"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={playPauseAudio}
                className="w-16 h-16 rounded-full items-center justify-center"
                disabled={!processedUrl || !!streamError}
                style={{
                  opacity: !processedUrl || streamError ? 0.5 : 1,
                }}
              >
                <Ionicons
                  name={isAudio ? (player.playing ? "pause" : "play") : "play"}
                  size={32}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={skipForward}
                disabled={!processedUrl || !!streamError}
              >
                <Ionicons
                  name="play-forward"
                  size={32}
                  color={!processedUrl || streamError ? "#666" : "#D9D9D9"}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center">
              <icons.loudPlayIcon width={24} height={24} />
              <icons.shareIcon width={24} height={24} />
            </View>
          </View>

          {/* Campaigns Section */}
          {campaignPrompts.length === 0 && (
            <View className="px-5 mt-8 items-center justify-center">
              <Text className="text-white text-center mt-10 text-lg">
                No campaign available for this song.
              </Text>
            </View>
          )}

          {campaignPrompts.length > 0 && (
            <View className="px-5 pt-6">
              <Text className="text-white font-bold text-xl mb-4">
                Share Your Feedback
              </Text>
              {campaignPrompts.map(renderPrompt)}
              {/* Include textarea for text response */}

              <TextInput
                className="bg-primary rounded-2xl p-4 min-h-[100px] text-white text-sm mt-4"
                placeholder="Additional comments..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={textAnswers["additional_comments"] || ""}
                onChangeText={(text) =>
                  handleTextAnswer("additional_comments", text)
                }
              />
            </View>
          )}
          <View className="px-20 mb-10 mt-6">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-white rounded-2xl py-4  items-center"
            >
              <Text className="text-black font-bold text-lg">Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
