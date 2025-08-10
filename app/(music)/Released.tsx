import { View, Text, TouchableOpacity, TextInput, } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";

export default function Released() {
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
        <TouchableOpacity onPress={() => router.push("/ReleasedPreview")}>
          <Text className="text-secondary font-semibold text-lg">Continue</Text>
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
          onPress={()=>router.push("/ReleasedPreview")}
        >
          <ArrowRight />
        </TouchableOpacity>
      </View>
    </View>
  );
}
