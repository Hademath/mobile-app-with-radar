// app/register/11-profile-type-selected.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

// Simulated selected type (in real app, pull from global state)
const selectedType = {
  label: "Listener",
  emoji: "🎧",
};

export default function ConfirmProfileTypeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={10} total={14} type={"onboardingBar"} />
      <View className="flex-1 px-6 justify-center items-center">
        <Text className="text-white text-2xl font-semibold mb-4">
          You’ve selected:
        </Text>

        <View className="bg-white rounded-2xl px-6 py-4 mb-10">
          <Text className="text-black text-3xl font-bold text-center">
            {selectedType.emoji} {selectedType.label}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("./Username")}
          className="bg-white py-3 px-10 rounded-xl"
        >
          <Text className="text-center text-black font-semibold text-base">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
