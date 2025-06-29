// app/register/14-profile-picture.tsx
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

const avatars = [
  require("@/assets/images/avatars/avatar1.png"),
  require("@/assets/images/avatars/avatar1.png"),
  require("@/assets/images/avatars/avatar1.png"),
  require("@/assets/images/avatars/avatar1.png"),
];

export default function ProfilePictureScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={13} total={14} />
      <View className="flex-1 px-6 justify-center">
        <Text className="text-white text-2xl font-semibold mb-4">
          Upload your profile picture
        </Text>

        <TouchableOpacity
          onPress={() => {
            // Later: use expo-image-picker here
            alert("Open image picker (to be implemented)");
          }}
          className="bg-[#1A1A1A] py-4 px-6 rounded-xl mb-8 border border-gray-600"
        >
          <Text className="text-white text-center">Upload from gallery</Text>
        </TouchableOpacity>

        <Text className="text-white mb-2">Or choose an avatar:</Text>
        <FlatList
          data={avatars}
          horizontal
          keyExtractor={(_, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item, index }) => {
            const isSelected = selected === index;
            return (
              <TouchableOpacity
                onPress={() => setSelected(index)}
                className={`rounded-full overflow-hidden border-2 ${
                  isSelected ? "border-white" : "border-transparent"
                }`}
              >
                <Image
                  source={item}
                  className="w-20 h-20 rounded-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          onPress={() => router.push("./notifications")}
          disabled={selected === null}
          className={`mt-10 py-3 rounded-xl ${
            selected !== null ? "bg-white" : "bg-gray-600"
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
