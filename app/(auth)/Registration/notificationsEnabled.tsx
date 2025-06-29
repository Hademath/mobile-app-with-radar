// app/register/15-notifications.tsx
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

export default function NotificationScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  const handleFinish = () => {
    // Later: store notification preference
    router.replace("/Index"); // Route to index (home screen)
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={14} total={14} />
      <View className="flex-1 px-6 justify-center">
        <Text className="text-white text-2xl font-semibold mb-4">
          Enable notifications?
        </Text>
        <Text className="text-gray-400 mb-6">
          Get alerts about updates, messages, and more.
        </Text>

        <View className="flex-row items-center justify-between bg-[#1A1A1A] rounded-xl px-4 py-4 mb-10">
          <Text className="text-white text-base">Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#555", true: "#fff" }}
            thumbColor={notificationsEnabled ? "#000" : "#888"}
          />
        </View>

        <TouchableOpacity
          onPress={handleFinish}
          className="bg-white py-3 rounded-xl"
        >
          <Text className="text-center text-black font-semibold text-base">
            Finish
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
