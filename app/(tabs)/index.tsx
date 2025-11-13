import { router } from "expo-router";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Ionicons, Entypo } from "@expo/vector-icons";
import ProgressHeader from "../components/ProgressHeader";
import { useAuth } from "@/providers/AuthContext";
import { useCallback, useMemo, useState } from "react";
// import musicEndpoints from "@/endpoints/musicEndpoints";
import * as musicAPI from "../../endpoints/musicEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";

// Type for song
interface Song {
  uuid: string;
  title: string;
  artist: {
    name: string;
    uuid: string;
  };
  artworkUrl: string | null;
  streamUrl: string;
  externalPlatform: string | null;
  releaseDate: string | null;
}

export default function Index() {
  const { user, isLoggedIn, refreshUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (!isLoggedIn || !user?.token) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);
    await refreshUser();
    setRefreshing(false);
  }, [refreshUser, isLoggedIn, user]);

  // const API = new musicEndpoints();
  const { data } = useEndpointQuery({
    queryFn: musicAPI.getAllSongs,
    queryKey: ["fetch songs"],
  });

  const songs: Song[] = useMemo(() => data?.data?.data || [], [data]);

  return (
    <LinearGradient
      colors={["#0f1e1d", "#000000", "#242424"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 px-4 pt-14"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Top Row: Avatar - Days - Balance */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.push("/Menu")}>
              <Image
                className="w-12 h-12 rounded-full"
                source={
                  user?.avatar
                    ? { uri: user.avatar as string }
                    : require("@/assets/images/avatars/avatar1.png")
                }
              />
            </TouchableOpacity>

            <View className="flex-row items-center space-x-1">
              <Image
                className="w-12 h-12 rounded-full"
                source={require("@/assets/icons/fireicon.png")}
              />
              <Text className="text-gray-400">250 days</Text>
            </View>
          </View>

          <TouchableOpacity
            // onPress={() => router.push("/Registration/GetStarted")}
            className="flex-row gap-3 items-center space-x-2 bg-accent px-6 py-4 rounded-3xl"
          >
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-semibold">{user?.radar}</Text>
          </TouchableOpacity>
        </View>

        {/* Top Artiste Rank Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4 px-1">
            <Text className="text-white font-bold text-xl">
              Top Artiste Rank
            </Text>
            <TouchableOpacity>
              <FontAwesome6 name="circle-arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Horizontal Scrollable Cards with actual songs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {songs.slice(0, 10).map((song, index) => {
              const rank = index + 1;
              return (
                <View
                  key={song.uuid}
                  className="flex-row items-start space-x-2"
                >
                  <View className="flex-row items-center justify-end px-1">
                    <Text className="text-white text-2xl font-bold">
                      {rank}
                    </Text>
                    {rank === 1 ? (
                      <Entypo name="triangle-up" size={30} color="green" />
                    ) : (
                      <Entypo name="triangle-down" size={30} color="red" />
                    )}
                  </View>
                  <View
                    className={`mr-4 ${
                      index === 0 ? "ml-1" : ""
                    } flex-col w-44 rounded-2xl overflow-hidden`}
                  >
                    <View className="relative">
                      <Image
                        className="w-full h-64 rounded-lg"
                        resizeMode="cover"
                        source={
                          song.artworkUrl
                            ? { uri: song.artworkUrl }
                            : require("@/assets/images/content/rema1.jpg")
                        }
                      />

                      <View className="absolute m-2 w-full gap-4">
                        <View className="flex-row justify-between">
                          <Text className="text-white" numberOfLines={1}>
                            {song.title}
                          </Text>
                          <View className="absolute right-2 bg-black/40 p-1 mr-3 rounded-full">
                            <Ionicons
                              name="volume-medium"
                              size={14}
                              color="white"
                            />
                          </View>
                        </View>
                        <View>
                          <ProgressHeader
                            step={3}
                            total={5}
                            type={"onboardingBar"}
                            showBackArrow={false}
                          />
                        </View>
                      </View>

                      <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full flex-row items-center">
                        <Ionicons name="play" size={14} color="white" />
                        <Text className="text-white text-xs ml-1">20.4k</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Songs Recommendation Cards */}
        {songs.map((song, index) => (
          <View key={song.uuid} className="rounded-3xl mb-6 overflow-hidden">
            <View className="flex-row gap-3 items-center space-x-2 mb-4">
              <Image
                source={
                  song.artworkUrl
                    ? { uri: song.artworkUrl }
                    : require("@/assets/images/content/moreafro.jpg")
                }
                className="w-10 h-10 rounded-full"
              />
              <Text className="text-white font-semibold">
                More from <Text className="font-bold">{song.artist.name}</Text>
              </Text>
            </View>

            <View className="bg-accent rounded-3xl overflow-hidden">
              <Image
                className="w-full h-56"
                resizeMode="cover"
                source={
                  song.artworkUrl
                    ? { uri: song.artworkUrl }
                    : require("@/assets/images/content/rema1.jpg")
                }
              />

              <View className="absolute top-3 right-2 mr-3 bg-black/40 p-2 rounded-full">
                <Ionicons name="volume-high" size={16} color="white" />
              </View>

              <View className="p-4 space-y-1">
                <View className="flex-row items-center gap-2 space-x-2 mb-2">
                  <Image
                    source={require("@/assets/images/ArtisteRadarLogo.png")}
                    className="w-5 h-5"
                  />
                  <Text className="text-xs text-gray-400 font-semibold">
                    {song.externalPlatform || "Original"}
                  </Text>
                </View>

                <Text className="text-2xl text-white font-bold">
                  {song.title}
                </Text>
                <Text className="text-sm text-tertiary mt-2">
                  {song.artist.name} •{" "}
                  {song.releaseDate
                    ? new Date(song.releaseDate).getFullYear()
                    : "Unreleased"}
                </Text>
                <Text className="text-sm text-tertiary mt-2">
                  Because you listen to pop music
                </Text>

                <View className="flex-row justify-between mt-4 gap-4 space-x-4">
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(music)/MusicPlayerWithPrompts",
                        params: {
                          songId: song.uuid,
                          title: song.title,
                          artist: song.artist.name,
                          artworkUrl: song.artworkUrl,
                          streamUrl: song.streamUrl,
                        },
                      })
                    }
                    className="flex-1 h-10 bg-white items-center justify-center rounded-xl"
                  >
                    <Text className="text-black font-semibold">
                      Give feedback
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-1 h-10 bg-primary items-center justify-center rounded-xl">
                    <Text className="text-white font-semibold">Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
