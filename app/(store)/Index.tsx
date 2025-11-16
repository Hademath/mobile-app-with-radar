import {  router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import ArtisteLogo3 from "@/assets/images/svgs/ArtisteLogo3";

import {  FontAwesome6, Ionicons, Entypo } from "@expo/vector-icons";
import ProgressHeader from "../components/ProgressHeader";
import React,{ useState } from "react";


export default function Index() {

const Tabs = [
  { id: "spotlight", title: "Spotlight" },
  { id: "physical", title: "Physical Offers" },
];
    
    const [activeTab, setActiveTab] = useState(Tabs[0].id);

  return (
    <LinearGradient
      colors={["#0f1e1d", "#000000", "#242424"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <ScrollView className="flex-1 px-4 pt-14">
        {/* Top Row: Avatar - Days - Balance */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.push("/Menu")}>
              <Image
                className="w-12 h-12 rounded-full"
                source={require("@/assets/images/avatars/avatar1.png")}
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
            onPress={() => router.push("/Registration/GetStarted")}
            className="flex-row  gap-3 items-center space-x-2 bg-accent px-6 py-4 rounded-3xl"
          >
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-semibold">5000.00</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs*/}
        <View>
          <View className="flex-row justify-between items-center mb-4 px-1">
            {Tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab.id ? "bg-primary" : ""
                }`}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text
                  className={`font-bold text-xl ${
                    activeTab === tab.id ? "text-white" : "text-black"
                  }`}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-8">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4 px-1">
            <Text className="text-white font-bold text-xl">
              Top Artiste Rank
            </Text>
            <TouchableOpacity>
              <FontAwesome6 name="circle-arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Cards */}
          <ScrollView
            style={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((rank, index) => (
              <View key={rank} className="flex-row items-start space-x-2 ">
                <View className="flex-row  items-center justify-end  px-1">
                  <Text className="text-white text-2xl font-bold">{rank}</Text>
                  {rank === 1 ? (
                    <Entypo name="triangle-up" size={30} color="green" />
                  ) : (
                    <Entypo name="triangle-down" size={30} color="red" />
                  )}
                </View>
                <View
                  className={`mr-4 ${
                    index === 0 ? "ml-1" : ""
                  } flex-col w-44  rounded-2xl overflow-hidden`}
                >
                  {/* Rank & Movement */}

                  {/* Song Block */}
                  <View className="relative">
                    <Image
                      className="w-full h-64 rounded-lg"
                      resizeMode="cover"
                      source={
                        rank === 1
                          ? require("@/assets/images/content/rema1.jpg")
                          : require("@/assets/images/content/secondrank.jpg") // Swap this out as needed
                      }
                    />

                    {/* Volume Icon (Top Right) */}
                    <View className="absolute m-2 w-full gap-4">
                      <View className="flex-row justify-between">
                        <Text className="text-white">Rema - Ravage</Text>
                        <View className="absolute  right-2 bg-black/40 p-1 mr-3 rounded-full">
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

                    {/* Play count (Bottom Left) */}
                    <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-full flex-row items-center">
                      <Ionicons name="play" size={14} color="white" />
                      <Text className="text-white text-xs ml-1">20.4k</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Music Card */}
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} className=" rounded-3xl mb-6 overflow-hidden">
            <View className="flex-row gap-3 items-center space-x-2 mb-4">
              <Image
                source={require("@/assets/images/content/moreafro.jpg")}
                className="w-10 h-10 rounded-full"
              />
              <Text className="text-white font-semibold">
                More of <Text className="font-bold">Afrobeat</Text>
              </Text>
            </View>

            <View className="bg-accent rounded-3xl overflow-hidden">
              <Image
                className="w-full h-56"
                resizeMode="cover"
                source={require("@/assets/images/content/rema1.jpg")}
              />

              <View
                className="absolute top-3 right-2 mr-3
               bg-black/40 p-2 rounded-full"
              >
                <Ionicons name="volume-high" size={16} color="white" />
              </View>
              <View className="p-4 space-y-1">
                <View className="flex-row items-center gap-2 space-x-2 mb-2">
                  <Image
                    source={require("@/assets/images/ArtisteRadarLogo.png")}
                    className="w-5 h-5"
                  />
                  <Text className="text-xs text-gray-400 font-semibold">
                    Genre
                  </Text>
                </View>

                <Text className="text-2xl text-white font-bold">Ravage</Text>
                <Text className="text-sm text-tertiary mt-2">
                  EP • Rema • 5 songs • 2023
                </Text>
                <Text className="text-sm text-tertiary mt-2 ">
                  Because you listen to pop music
                </Text>
                <View className="flex-row justify-between mt-4 gap-4 space-x-4">
                  <TouchableOpacity className="flex-1 h-10 bg-white items-center justify-center rounded-xl">
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
        {/* FAB (Floating Action Button) */}
        {/* <Link href="/(tabs)/Create" asChild>
          <TouchableOpacity className="absolute bottom-12 right-6 w-16 h-16 bg-black rounded-full items-center justify-center shadow-lg">
            <Text className="text-4xl text-cyan-400 -mt-1">＋</Text>
          </TouchableOpacity>
        </Link> */}
      </ScrollView>
    </LinearGradient>
  );
}
