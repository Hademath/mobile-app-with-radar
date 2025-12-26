import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressHeader from "../components/ProgressHeader";
import SearchInput from "../components/SearchInput";
import React, { useMemo } from "react";
import { useAuth } from "@/providers/AuthContext";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import * as musicAPI from "../../endpoints/musicEndpoints";
import * as authAPI from "../../endpoints/authEndpoints";
import { Song } from ".";

export default function Browse() {
  const { user } = useAuth();

  const { data, isLoading } = useEndpointQuery({
    queryFn: musicAPI.getAllSongs,
    queryKey: ["fetch songs"],
  });

  const { data: genres,} = useEndpointQuery({
    queryFn: authAPI.getGenres,
    queryKey: ["fetch genres"],
  });
  const newGenres = useMemo(() => genres?.data?.data || [], [genres]);

  const songs: Song[] = useMemo(() => data?.data?.data || [], [data]);

  // Handler for song card press - navigate to player
  const handleSongPress = (song: Song) => {
    console.log("Playing song:", song.title);
    router.push(`/(music)/MusicPlayerWithPrompts?songId=${song.uuid}`);
  };

  // Handler for genre press - navigate to search with genre filter
  const handleGenrePress = (genreName: string) => {
    console.log("Browse genre:", genreName);
    router.push({
      pathname: "/(music)/SearchScreen",
      params: { query: genreName },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center justify-between gap-4">
          <TouchableOpacity onPress={() => router.push("/Menu")}>
            <Image
              className="w-10 h-10 rounded-full"
              source={
                user?.avatar
                  ? { uri: user.avatar as string }
                  : require("@/assets/images/avatars/avatar1.png")
              }
            />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-1">
            <Text className="text-white text-xl font-semibold">Browse</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/Registration/GetStarted")}
          className="flex-row gap-3 items-center space-x-2 bg-accent px-6 py-4 rounded-3xl"
        >
          <Image
            source={require("@/assets/images/ArtisteRadarLogo.png")}
            className="w-5 h-5"
          />
          <Text className="text-white font-semibold">{user?.radar || 0}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View className="mb-8">
        <View className="mb-4 px-1">
          <SearchInput />
        </View>

        {/* Featured Songs - Top 2 */}
        {songs.length > 0 && (
          <View className="flex-row flex-wrap justify-between px-1">
            {songs.slice(0, 2).map((song, index) => {
              // const rank = index + 1;
              return (
                <TouchableOpacity
                  key={song.uuid || index}
                  onPress={() => handleSongPress(song)}
                  className="mb-4 w-[47%] rounded-2xl overflow-hidden active:opacity-80"
                  activeOpacity={0.8}
                >
                  <View className="flex-col rounded-2xl overflow-hidden">
                    <View className="relative">
                      <Image
                        className="w-full h-64 rounded-lg"
                        resizeMode="cover"
                        source={
                          song.artworkUrl
                            ? { uri: song.artworkUrl }
                            : index === 0
                            ? require("@/assets/images/content/secondrank.jpg")
                            : require("@/assets/images/content/rema1.jpg")
                        }
                      />

                      {/* Song Info & Volume Icon */}
                      <View className="absolute m-2 w-full gap-4">
                        <View className="flex-row justify-between items-start pr-8">
                          <Text
                            className="text-white font-semibold flex-1"
                            numberOfLines={1}
                          >
                            {song.title || "Unknown"}
                          </Text>
                          <View className="absolute right-2 bg-black/40 p-1 rounded-full">
                            <Ionicons
                              name="volume-medium"
                              size={14}
                              color="white"
                            />
                          </View>
                        </View>
                        <View>
                          <ProgressHeader
                            step={song.totalPlays || 0}
                            total={100}
                            type={"onboardingBar"}
                            showBackArrow={false}
                          />
                        </View>
                      </View>

                      {/* Play count */}
                      <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full flex-row items-center">
                        <Ionicons name="play" size={14} color="white" />
                        <Text className="text-white text-xs ml-1">
                          {song.totalPlays || 0}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Artist Info */}
                  <View className="flex-row items-center gap-2 mt-3">
                    <Image
                      className="w-6 h-6 rounded-full"
                      source={
                        song.artist?.avatar
                          ? { uri: song.artist?.avatar }
                          : require("@/assets/images/content/moreafro.jpg")
                      }
                    />
                    <Text className="text-white text-xs" numberOfLines={1}>
                      {song.artist?.name || "Unknown Artist"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Empty State for Featured */}
        {songs.length === 0 && (
          <View className="items-center py-8">
            <Text className="text-tertiary">No songs available yet</Text>
          </View>
        )}
      </View>

      {/* Browse All Section */}
      <Text className="text-white text-xl font-bold mb-4">Browse all</Text>
      <View className="flex-row flex-wrap justify-between px-1 mb-8">
        {newGenres.map((genre: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleGenrePress(genre.genres_name)}
            className="mb-4 w-[48%] rounded-2xl overflow-hidden active:opacity-80"
            activeOpacity={0.8}
          >
            <View className="relative rounded-2xl overflow-hidden bg-accent">
              <Image
                className="w-full h-32"
                resizeMode="cover"
                source={
                  genre.representive_picture
                    ? { uri: genre.representive_picture }
                    : require("@/assets/images/content/searchafro.jpg")
                }
              />

              <View className="absolute bottom-2 left-2 px-2 py-1 rounded-md">
                <Text className="text-white text-lg font-semibold">
                  {genre.genres_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
