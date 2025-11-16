import {  router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SmileIcon from "@/assets/icons/smileIcon";
import SadIcon from "@/assets/icons/sadIcon";
import {storeDetail} from "@/data/storedetail";

import {  Ionicons, } from "@expo/vector-icons";
import React, { useState } from "react";


export default function Store() {

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
      <ScrollView className="flex-1 bg-[#0A1B1E] px-4 pt-14">
        {/* Top Row */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Image
                className="w-10 h-10 rounded-full"
                source={require("@/assets/images/avatars/avatar1.png")}
              />
            </TouchableOpacity>
            <View className="flex-row items-center space-x-1">
              <Image
                source={require("@/assets/icons/fireicon.png")}
                className="w-5 h-5"
              />
              <Text className="text-gray-400 text-sm">250 days</Text>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center bg-[#033E3E] px-4 py-2 rounded-full">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5 mr-1"
            />
            <Text className="text-white font-semibold text-sm">5000.00</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row space-x-3 mb-6">
          {Tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              className={`px-5 py-4 rounded-full ${
                activeTab === tab.id ? "bg-accent" : ""
              }`}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                className={`font-semibold ${
                  activeTab === tab.id ? "text-white" : "text-white"
                }`}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spotlight Section */}
        <Text className="text-white font-bold text-lg mb-6 mt-6">
          Spotlight
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((_, i) => (
            <View
              key={i}
              className="w-[280px] mr-4 rounded-2xl overflow-hidden bg-accent"
            >
              <View className="relative">
                <Image
                  source={require("@/assets/images/content/freeshop.jpg")}
                  className="w-full h-52"
                  resizeMode="cover"
                />
                {/* Top badges */}
                <View className="absolute top-3 left-3 bg-accent px-3 py-1  rounded-full">
                  <Text className="text-white text-xs">FREE</Text>
                </View>
                <View className="absolute top-3 right-3 bg-accent px-3 py-1 rounded-full flex-row items-center">
                  <Image
                    source={require("@/assets/images/ArtisteRadarLogo.png")}
                    className="w-4 h-4 mr-1"
                  />
                  <Text className="text-white text-xs">01d21h41m23s</Text>
                </View>

                {/* Bottom overlay */}
                <View className="bg-[#9BACCA] p-3">
                  <Text className="text-accent text-xl font-bold mb-2">
                    78% off + 2 free months with Surfshark Antivirus
                  </Text>
                  <View className="flex-row items-center">
                    <View className="flex-row -space-x-3 mr-1 ml-5">
                      {[
                        require("@/assets/images/avatars/avatar1.png"),
                        require("@/assets/images/avatars/avatar1.png"),
                        require("@/assets/images/avatars/avatar2.png"),
                        require("@/assets/images/avatars/avatar3.png"),
                      ].map((img, idx) => (
                        <Image
                          key={idx}
                          source={img}
                          // className="w-6 h-6 rounded-full  border border-black"
                          className={`w-10 h-10 rounded-full border border-white -ml-6 `}
                        />
                      ))}
                      <View className="w-10 h-10 border rounded-full border-white items-center justify-center -ml-6 bg-accent">
                        <Text className="text-white">52k</Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-black text-lg">
                        {" "}
                        Others Bought this{" "}
                      </Text>
                    </View>
                  </View>
                  <View className="px-2 py-1 mt-2 rounded">
                    <Text className="text-black text-lg ">Surfshark</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Feedback Row */}
        <View className="bg-accent mt-6 rounded-xl p-4">
          <Text className="text-white text-xl text-center mb-3">
            Do you enjoy the marketplace?
          </Text>
          <View className="flex-row justify-center space-x-10 gap-5 h-12">
            <TouchableOpacity className="bg-[#FFFFFF33] justify-center items-center w-[138px]  px-4 py-2 rounded-xl">
              <SadIcon />
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#FFFFFF33] justify-center items-center w-[138px] px-4 py-2 rounded-xl">
              <SmileIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Physical Offers */}
        <View className="flex-row justify-between items-center mt-6 mb-4">
          <Text className="text-white font-bold text-lg">Physical Offers</Text>
          <Ionicons name="arrow-forward-circle" size={24} color="white" />
        </View>

        <FlatList
          className="mb-[200px]"
          data={storeDetail}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className="flex-row  rounded-2xl overflow-hidden mb-4"
              style={{ backgroundColor: item.color }}
            >
              <View className="w-[48%]">
                <Image
                  source={item.image}
                  className="w-full h-48"
                  resizeMode="cover"
                />
              </View>
              <View className="absolute top-3 left-3 bg-accent px-4 py-2  rounded-full">
                {/* <Text className="text-white text-xs">FREE</Text> */}
                {item.amount === 0 ? (
                  <Text className="text-white font-bold">FREE</Text>
                ) : (
                  <View className="flex-row items-center">
                    <Image
                      source={require("@/assets/images/ArtisteRadarLogo.png")}
                      className="w-4 h-4 mr-1"
                    />
                    <Text className="text-white text-sm font-bold">
                      {item.amount.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>

              <View className="p-3 gap-10">
                <Text
                  className="text-sm font-semibold"
                  style={{ backgroundColor: item.color }}
                >
                  {item.title}
                </Text>
                <Text  style={{ backgroundColor: item.color }} className="text-xs mt-1">{item.description}</Text>

                <View className="flex-row items-center">
                  <View className="flex-row -space-x-3 mr-1 ml-5">
                    {[
                      require("@/assets/images/avatars/avatar1.png"),
                      require("@/assets/images/avatars/avatar1.png"),
                      require("@/assets/images/avatars/avatar2.png"),
                      require("@/assets/images/avatars/avatar3.png"),
                    ].map((img, idx) => (
                      <Image
                        key={idx}
                        source={img}
                        // className="w-6 h-6 rounded-full  border border-black"
                        className={`w-8 h-8 rounded-full border border-white -ml-4 `}
                      />
                    ))}
                    <View className="w-8 h-8 border rounded-full border-white items-center justify-center -ml-4 bg-accent">
                      <Text className="text-white">52k</Text>
                    </View>
                  </View>
                  <View>
                    <Text  className="text-sm">Others Bought this</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
}
