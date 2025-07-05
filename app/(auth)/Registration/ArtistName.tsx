
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

export default function ArtistName() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <ProgressHeader step={2} total={5} type={"onboardingBar"} />
      <View className="flex-1 py-10 ">
        <View>
          <Text className="text-white text-3xl font-bold mb-1 font-clash uppercase">
            Your Artiste Name
          </Text>
          <Text className="text-boarderColor mb-4">
            Let&apos;s get started by setting up your official artiste name.
          </Text>
        </View>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Artiste name"
          placeholderTextColor="#888"
          autoCapitalize="none"
          className="bg-[#1A1A1A] text-white px-6 py-4 rounded-xl mb-20"
        />

        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./ArtisteGenres")}
            className="bg-white py-4 px-14 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-normal">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
