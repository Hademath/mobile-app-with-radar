// app/listening-history.tsx

import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import SpotifyIcon from "@/assets/images/svgs/SpotifyIcon";
import YoutubeIcon from "@/assets/images/svgs/YoutubuRedIcon";
import OverlappingIcon from "../components/OverlappingIcon";
import React, { useMemo } from "react";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import * as musicAPI from "../../endpoints/musicEndpoints";

export default function ListeningHistory() {
  const router = useRouter();

  const { data, isLoading } = useEndpointQuery({
    queryFn: musicAPI.getSongPlayHistory,
    queryKey: ["fetch played songs history"],
  });
// console.log("Fetched listening history data:", data); 
  const songsHistory = useMemo(() => {
    if (!data?.data.data?.plays) return [];

    return data.data.data.plays.map((play: any) => {
      const song = play.song;
      const artist = song.artist;

      return {
        id: play.uuid,
        songId: song.uuid,
        image: song.artworkUrl
          ? { uri: song.artworkUrl }
          : require("@/assets/images/content/ravage.jpg"), // fallback image
        title: song.title,
        artist: artist
          ? `${artist.firstName} ${artist.lastName}`
          : "Unknown Artist",
        username: artist?.username || "",
        genre: song.genre?.genres_name || "Unknown",
        firstplayed: play.createdAt
          ? new Date(play.createdAt).toLocaleString([], {
              month: "short",
              day: "numeric",
            })
          : "N/A",
        lastPlayed: play.playedAt
          ? new Date(play.playedAt).toLocaleString([], {
              month: "short",
              day: "numeric",
            })
          : "N/A",
        status: play.durationListened > 0 ? "Active" : "Inactive",
        statusColor: play.durationListened > 0 ? "bg-active" : "bg-inactive/60",
        externalPlatform: song.externalPlatform,
        // durationListened: play.durationListened,
        playedAt: play.playedAt,
        streamUrl: song.streamUrl,
      };
    });
  }, [data]);

  // console.log("Songs played history:", songsHistory);

  // Helper function to get platform icons
  const getPlatformIcons = (platform: string | null) => {
    const icons = [];

    if (platform === "spotify") {
      icons.push(
        <OverlappingIcon key="spotify" z={0}>
          <SpotifyIcon className="text-white" />
        </OverlappingIcon>
      );
    } else if (platform === "youtube") {
      icons.push(
        <OverlappingIcon key="youtube" z={0}>
          <YoutubeIcon className="text-white" />
        </OverlappingIcon>
      );
    } else {
      // For uploaded songs without platform
      icons.push(
        <OverlappingIcon key="uploaded" z={0} className="bg-primary">
          <Text className="text-white text-xs font-semibold">UP</Text>
        </OverlappingIcon>
      );
    }

    return icons;
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-14 ">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-white items-center text-2xl font-bold">
          Listening History
        </Text>
        <Text></Text>
      </View>

      {songsHistory.length === 0 ? (
        <View className="items-center justify-center mt-20">
          <Text className="text-tertiary text-lg font-semibold">
            No listening history yet
          </Text>
        </View>
      ) : (
        songsHistory.map((item: any) => (
          <View key={item.id} className="bg-accent rounded-3xl p-4 mb-8 pb-10">
            <View className="flex-row justify-between">
              <Image source={item.image} className="w-20 h-20 rounded-lg" />
              <View className="flex-col flex-1 ml-3">
                <View className="flex-row justify-center items-center">
                  <Text
                    className="text-white text-3xl font-bold flex-1 mr-2"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <View
                    className={`pl-3 px-6 py-2  rounded-lg ${item.statusColor}`}
                  >
                    <Text className="text-white text-xs  text-center font-semibold">
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text className="text-tertiary mt-1 text-sm"  numberOfLines={1}>
                  {item.genre} • {item.artist} • {item.lastPlayed} - {item.firstplayed}
                </Text>
                <View className="flex-row mt-2 ml-4">
                  {getPlatformIcons(item.externalPlatform)}
                  {item.durationListened > 0 && (
                    <OverlappingIcon z={10} className="bg-primary -ml-2">
                      <Text className="text-white text-xs font-semibold">
                        {item.durationListened} s 
                      </Text>
                    </OverlappingIcon>
                  )}
                </View>
              </View>
            </View>

            <View className="flex-row justify-between mt-8">
              <TouchableOpacity
                className="bg-white flex-1 mr-2 h-12 items-center justify-center rounded-xl"
                onPress={() => {
                  // Navigate to details or handle view details
                  console.log("View details:", item.id);
                }}
              >
                <Text className="text-black font-semibold">View details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-black border flex-1 ml-2 h-12 items-center justify-center rounded-xl"
                onPress={() => {
                  // Handle share functionality
                  console.log("Share:", item.streamUrl);
                }}
              >
                <Text className="text-white font-semibold">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
