
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

export default function UsernameScreen() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={11} total={14} />
      <View className="flex-1 px-6 justify-center">
        <Text className="text-white text-2xl font-semibold mb-1">
          Create a username
        </Text>
        <Text className="text-gray-400 mb-4">
          This is how others will see you.
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="e.g. radarkid"
          placeholderTextColor="#888"
          autoCapitalize="none"
          className="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl mb-8"
        />

        <TouchableOpacity
          onPress={() => router.push("./Genres")}
          disabled={!username}
          className={`py-3 rounded-xl ${
            username ? "bg-white" : "bg-gray-600"
          }`}
        >
          <Text className="text-center text-black font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
