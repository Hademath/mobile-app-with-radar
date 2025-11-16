
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";

type CreateAccountHeaderProps = {
  headerTitle?: string;
};

export default function CreateAccountHeader(headerTitle: CreateAccountHeaderProps) {
  const router = useRouter();
  return (
    <View className="flex-row items-center w-full ">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 "
      >
        <ArrowLeft size={20} color="black" />
      </TouchableOpacity>
      <Text className="text-white text-3xl font-bold ml-8 ">
        {headerTitle.headerTitle || "Create Account"}
      </Text>
    </View>
  );
}
