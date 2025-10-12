import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, } from "react-native";
import { useState, useMemo, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as musicAPI from "../../endpoints/musicEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import { useAudioPlayer } from "expo-audio";
import { CampaignPrompt } from "@/types/musicTypes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TextTicker from "react-native-text-ticker";
import icons from "@/constants/icons";
import { authInstance } from "@/utils/apiService";

export default function MusicPlayerWithPrompts() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { data, isLoading, error } = useEndpointQuery({
    queryFn: () => musicAPI.getSongByIdIncludePrompts(params.songId as string),
    queryKey: [`fetch song`],
    enabled: !!params.songId,
  });

  const song = useMemo(() => {
    return (
      data?.data?.data || {
        title: "Loading...",
        artist: { name: "Loading..." },
        artworkUrl: null,
        audioEndpoint: null,
        duration: 195,
        campaigns: [],
      }
    );
  }, [data]);
  
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [streamError, setStreamError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Process audio URL based on platform
  useEffect(() => {
    const processUrl = async () => {
      setStreamError(null);
      setIsProcessing(true);

      try {
        // Case 1: Direct Cloudinary upload - use streamUrl directly
        if (song.streamUrl && !song.externalPlatform) {
          console.log("✅ Using direct Cloudinary URL");
          setProcessedUrl(song.streamUrl);
          setIsProcessing(false);
          return;
        }

        // Case 2: YouTube - fetch from API endpoint
        if (song.externalPlatform === "youtube" && song.externalId) {
          console.log("🎥 Fetching YouTube audio for:", song.externalId);

          try {
            const response = await authInstance.get(
              `/youtube-audio?videoId=${song.externalId}`
            );
            console.log("YouTube response:", response);
            const audioUrl = response.data?.data?.audioUrl;

            if (audioUrl) {
              console.log("✅ YouTube audio URL obtained");
              setProcessedUrl(audioUrl);
            } else {
              setStreamError("Could not extract YouTube audio");
            }
          } catch (error: any) {
            console.error("❌ YouTube fetch error:", error);
            setStreamError(
              "Failed to fetch YouTube audio. It may be restricted."
            );
          }
        }
        // Case 3: Spotify - fetch from API endpoint
        else if (song.externalPlatform === "spotify" && song.externalId) {
          console.log("🎵 Fetching Spotify audio for:", song.externalId);

          try {
            const response = await authInstance.get(
              `/spotify-audio?trackId=${song.externalId}`
            );
            const audioUrl = response.data?.data?.audioUrl;

            if (audioUrl) {
              console.log("✅ Spotify audio URL obtained (30-second preview)");
              setProcessedUrl(audioUrl);
            } else {
              setStreamError("No preview available for this Spotify track");
            }
          } catch (error: any) {
            console.error("❌ Spotify fetch error:", error);
            setStreamError(
              "Failed to fetch Spotify track. Requires Premium for full playback."
            );
          }
        }
        // Case 4: Use audioEndpoint if provided
        else if (song.audioEndpoint) {
          console.log("📡 Using audioEndpoint:", song.audioEndpoint);

          try {
            const response = await authInstance.get(song.audioEndpoint);
            const audioUrl = response.data?.data?.audioUrl;

            if (audioUrl) {
              console.log("✅ Audio URL obtained from endpoint");
              setProcessedUrl(audioUrl);
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

    processUrl();
  }, [
    song.streamUrl,
    song.externalPlatform,
    song.externalId,
    song.audioEndpoint,
  ]);

  // Initialize audio player with processed URL
  const player = useAudioPlayer(processedUrl || "");

  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  const campaignPrompts: CampaignPrompt[] = song.campaigns || [];

  const playPauseAudio = () => {
    if (!processedUrl || streamError) return;

    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipForward = () => {
    if (!processedUrl || streamError) return;
    player.seekBy(10);
  };

  const skipBackward = () => {
    if (!processedUrl || streamError) return;
    player.seekBy(-10); 
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

  const handleSubmit = () => {
    const surveyResponses = {
      songId: params.songId,
      answers: answers,
      textAnswers: textAnswers,
      campaignId: campaignPrompts[0]?.campaignId || null,
    };
    console.log("Survey responses:", surveyResponses);

    player.pause();
    router.back();
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

  const duration = player.duration || song.duration || 195;
  const [currentTime, setCurrentTime] = useState(player.currentTime || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(player.currentTime || 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

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
          <View className="flex-row gap-2 px-5 pt-12 py-20 bg-primary">
            <TouchableOpacity
              onPress={() => {
                player.pause();
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

            <TouchableOpacity className="px-4 py-3 flex-row justify-center gap-1 bg-accent rounded-lg">
              <Text className="text-white font-semibold">Follow </Text>
              <FontAwesome name="plus-circle" size={18} color="white" />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
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

          {/* Processing Indicator */}
          {isProcessing && (
            <View className="mx-5 mb-4 p-4 bg-blue-900/50 rounded-xl border border-blue-500">
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#60A5FA" />
                <Text className="text-blue-300 text-sm ml-3">
                  Fetching audio...
                </Text>
              </View>
            </View>
          )}

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
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="thumb-up" color="#5F6368" size={18} />
                  <Text className="text-white text-[16px]">1.7m</Text>
                </View>

                <Text className="text-white mx-3 text-[16px]">|</Text>

                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="thumb-down" color="#5F6368" size={18} />
                  <Text className="text-white text-[16px]">1.7m</Text>
                </View>
              </View>
            </View>

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
                  name={player.playing ? "pause" : "play"}
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

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-white rounded-2xl py-4 mb-8 items-center"
              >
                <Text className="text-black font-bold text-lg">Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
