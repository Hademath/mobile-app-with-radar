import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
// import { set } from "react-hook-form";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <CreateAccountHeader headerTitle="Reset Password" />
      <View className="flex-1 py-20">
        <Text className="text-white text-2xl font-bold mb-1">
          What’s your email?
        </Text>
        <Text className="text-boarderColor mb-4">
          A verification code will be sent to your email.
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#888"
          className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-20"
        />

        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./CodeVerification")}
            className="bg-white py-4 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
