// app/register/10-profile-type.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

const profileTypes = [
  { id: "listener", label: "Listener", emoji: "🎧" },
  { id: "artiste", label: "Artiste", emoji: "🎤" },
  { id: "music-pro", label: "Music Pro", emoji: "🎚️" },
];

export default function ProfileTypeScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={9} total={14} />
      <View className="flex-1 px-6 justify-center">
        <Text className="text-white text-2xl font-semibold mb-6">
          Choose your profile type
        </Text>

        <View className="space-y-4 mb-10">
          {profileTypes.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelected(item.id)}
              className={`flex-row items-center p-4 rounded-xl ${
                selected === item.id
                  ? "bg-white"
                  : "bg-[#1A1A1A] border border-gray-700"
              }`}
            >
              <Text
                className={`text-2xl mr-3 ${
                  selected === item.id ? "text-black" : "text-white"
                }`}
              >
                {item.emoji}
              </Text>
              <Text
                className={`text-base font-medium ${
                  selected === item.id ? "text-black" : "text-white"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (selected) {
              router.push("./profile-type-selected");
            }
          }}
          disabled={!selected}
          className={`py-3 rounded-xl ${selected ? "bg-white" : "bg-gray-600"}`}
        >
          <Text className="text-center text-black font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
