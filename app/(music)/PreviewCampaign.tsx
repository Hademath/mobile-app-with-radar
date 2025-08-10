import { View, Text, TouchableOpacity,ScrollView, Image} from "react-native";
// import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function PreviewCampaign() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12 ">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white font-bold text-lg mr-8 ">Review</Text>
        </View>
        <View>
          <Text className="font-semibold text-lg"></Text>
        </View>
      </View>
      <View className=" w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <View className=" items-center mb-6">
        <Text className="text-white items-center font-bold  text-3xl mb-2">
          All good?
        </Text>
      </View>

      {/* Form Container */}
      <View className="bg-accent rounded-3xl p-5 gap-5">
        <View className="flex-row justify-between ">
          <Text className="text-artgray"> Audience</Text>
          <Text className="text-artgray">Listeners</Text>
        </View>
        <View className="flex-row justify-between ">
          <Text className="text-artgray">Music Type</Text>
          <Text className="text-artgray">Unreleased</Text>
        </View>
        <View className="flex-row justify-between ">
          <Text className="text-artgray">Age</Text>
          <Text className="text-artgray">18-30</Text>
        </View>
        <View className="flex-row justify-between ">
          <Text className="text-artgray">Duration</Text>
          <Text className="text-artgray">6 days</Text>
        </View>
        <View className="flex-row justify-between ">
          <Text className="text-artgray">Estimated Reach</Text>
          <Text className="text-artgray">600 - 2100</Text>
        </View>
      </View>

      {/* Upload Box */}

      <View className=" rounded-3xl mt-6">
        <Text className="text-white font-semibold mb-3"> Upload Preview </Text>
        <View className="bg-accent rounded-3xl overflow-hidden">
          <Image
            className="w-full h-56"
            resizeMode="cover"
            source={require("@/assets/images/content/rema1.jpg")}
          />
          <View className="absolute top-3 right-2 mr-3 bg-black/40 p-2 rounded-full">
            <Ionicons name="volume-medium" size={16} color="white" />
          </View>
        </View>

        {/* details  */}
        <View className="mt-4 rounded-3xl bg-accent  p-6">
          <View className="flex-row items-center gap-2 space-x-2 mb-2">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-xs text-gray-400 font-semibold">Genre</Text>
          </View>
          <Text className="text-2xl text-white font-bold">Ravage</Text>
          <Text className="text-sm text-tertiary mt-2">
            {" "}
            EP • Rema • 5 songs • 2023{" "}
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-end items-center mt-6 mb-12">
        <TouchableOpacity
          className="bg-secondary items-center rounded-2xl  p-6 text-white"
          onPress={()=> router.push("/Success")}
        >
          <Text className="text-primary font-bold text-lg">Run Campaign</Text>
        </TouchableOpacity>
      </View>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}
