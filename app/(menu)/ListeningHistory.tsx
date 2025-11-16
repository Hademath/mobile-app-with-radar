// app/listening-history.tsx

import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import SpotifyIcon from "@/assets/images/svgs/SpotifyIcon";
import YoutubeIcon from "@/assets/images/svgs/YoutubuRedIcon";
import OverlappingIcon from "../components/OverlappingIcon";
import React from "react";

export default function ListeningHistory() {
  const router = useRouter();

  const history = [
    {
      id: 1,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Active",
      statusColor: "bg-active",
    },
    {
      id: 2,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Inactive",
      statusColor: "bg-inactive/60",
    },
    {
      id: 3,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Inactive",
      statusColor: "bg-inactive/60",
    },
    {
      id: 4,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Inactive",
      statusColor: "bg-inactive/60",
    },
    {
      id: 5,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Inactive",
      statusColor: "bg-inactive/60",
    },
    {
      id: 6,
      image: require("@/assets/images/content/ravage.jpg"),
      title: "Ravage",
      artist: "Rema",
      period: "Jun 11 - Jul 10",
      status: "Inactive",
      statusColor: "bg-inactive/60",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-14">
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

      {history.map((item) => (
        <View key={item.id} className="bg-accent rounded-3xl p-4 mb-8">
          <View className="flex-row justify-between">
            <Image source={item.image} className="w-20 h-20 rounded-xl " />
            <View className="flex-col ">
              <View className="flex-row justify-between mr-8 ">
                <Text className="text-white text-3xl font-bold">
                  {" "}
                  {item.title}{" "}
                </Text>
                <View
                  className={`pl-3 pr-3 py-2 mb-2 rounded-lg ${item.statusColor}`}
                >
                  <Text className="text-white text-xs font-semibold">
                    {" "}
                    {item.status}{" "}
                  </Text>
                </View>
              </View>
              <Text className="text-tertiary mr-6">
                {" "}
                Single • {item.artist} • 2023 • {item.period}{" "}
              </Text>
              <View className="flex-row mt-2 ml-3 ">
                <OverlappingIcon z={0} className="">
                  <SpotifyIcon  className="text-white" />
                </OverlappingIcon>

                <OverlappingIcon z={10} className="-ml-2">
                  <YoutubeIcon  className="text-white" />
                </OverlappingIcon>

                <OverlappingIcon z={20} className="bg-primary -ml-2">
                  <Text className="text-white text-xs font-semibold">+3</Text>
                </OverlappingIcon>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-8">
            <TouchableOpacity className="bg-white flex-1 mr-2 h-12 items-center justify-center rounded-xl">
              <Text className="text-black font-semibold">View details</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-black border  flex-1 ml-2 h-12 items-center justify-center rounded-xl">
              <Text className="text-white font-semibold">Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
