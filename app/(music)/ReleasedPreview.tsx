import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

export default function ReleasedPreview() {
    const router = useRouter();

    const [songLink, setSongLink] = useState("");

    return (
      <View className="flex-1 bg-primary px-5 pt-12">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
          >
            <ArrowLeft size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/CampaignSetup")}>
            <Text className="text-teal-400 font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" w-full border-b border-accent mb-8"></View>
        {/* Title */}
        <Text className="text-white font-extrabold  text-4xl mb-2">
          Link Stream Platform
        </Text>
        <Text className="text-tertiary mb-12 text-lg">
          To proceed, copy and paste the music link
        </Text>

        {/* Form Container */}
        <View className=" flex-row justify-between rounded-3xl  gap-5">
          <TextInput
            value={songLink}
            onChangeText={setSongLink}
            placeholder="Paste music link"
            placeholderTextColor="#666767"
            className="bg-[#181819]  w-full rounded-xl  text-white px-4 py-6 "
          />
          <TouchableOpacity
            className="absolute right-0 bg-secondary py-5 px-4   rounded-xl"
            onPress={() => router.push("/CampaignSetup")}
          >
            <ArrowRight />
          </TouchableOpacity>
        </View>

        {/* Link Preview  */}
        <View className=" rounded-3xl mt-6">
          <Text className="text-white font-semibold mb-3"> Link Preview </Text>
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
      </View>
    );
}
