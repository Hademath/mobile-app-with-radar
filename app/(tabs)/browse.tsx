import {  router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import {  Ionicons } from "@expo/vector-icons";
import ProgressHeader from "../components/ProgressHeader";
import SearchInput from "../components/SearchInput";
import React from "react";

export default function Browse() {
  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-14">
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center justify-between gap-4">
          <TouchableOpacity onPress={() => router.push("/Menu")}>
            <Image
              className="w-10 h-10 rounded-full"
              source={require("@/assets/images/avatars/avatar1.png")}
            />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-1">
            <Text className="text-white">Browse</Text>
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
      {/* Logo + Title */}

      <View className="mb-8">
        <View className="mb-4 px-1">
          <SearchInput />
        </View>

        {/* Scrollable Cards */}
        <View className="flex-row flex-wrap justify-between px-1">
          {[1, 2].map((rank, index) => (
            <View
              key={rank}
              className="mb-4 w-[47%] rounded-2xl overflow-hidden"
            >
              <View
                className={`mr-4 ${
                  index === 0 ? "ml-1" : ""
                } flex-col w-44  rounded-2xl overflow-hidden`}
              >
                <View className="relative">
                  <Image
                    className="w-full h-64 rounded-lg"
                    resizeMode="cover"
                    source={
                      rank === 1
                        ? require("@/assets/images/content/secondrank.jpg")
                        : require("@/assets/images/content/rema1.jpg")
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
              <View className="flex-row items-center gap-2 mt-3">
                <Image
                  className="w-6 h-6 rounded-full"
                  source={require("@/assets/images/content/moreafro.jpg")}
                />

                <Text className="text-white text-xs">More of Afrobeat</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Music Card */}
      <Text className="text-white text-xl font-bold mb-8"> Browse all</Text>
      <View className="flex-row flex-wrap justify-between px-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <View
            key={index}
            className="mb-4 w-[48%] rounded-2xl overflow-hidden"
          >
            <View className="relative rounded-2xl overflow-hidden bg-accent">
              <Image
                className="w-full h-32"
                resizeMode="cover"
                source={require("@/assets/images/content/searchafro.jpg")}
              />

              <View className="absolute bottom-2 left-2  marker:px-2 py-1 rounded-md">
                <Text className="text-white text-lg font-semibold">
                  Afrobeat
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
