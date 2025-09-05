import {
  Image,
  Dimensions,
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressHeader from "../../components/ProgressHeader";

import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const noticeImge = require("@/assets/images/avatars/noticeimage.png");


const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 4;

export default function NotificationScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  
    const pickImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "We need access to your photos.");
        return;
      }
    };

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <ProgressHeader step={14} total={14} type={"onboardingBar"} />
      <View className="flex-1 justify-between py-6">
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold uppercase mb-2">
            Set notification to stay tuned
          </Text>
          <Text className="text-boarderColor">
            Enable push notifications to stay updated on new campaigns and other
            exciting news.
          </Text>
        </View>

        {/* Profile preview */}
        <View className="items-center ">
          <TouchableWithoutFeedback
            // onPress={pickImage}
            className="w-[200px] h-[201px] rounded-full "
          >
            <Image
              source={require("@/assets/images/avatars/noticeimage.png")}
              className="w-[200px] h-[200px] rounded-full"
            />
          </TouchableWithoutFeedback>
        </View>

        {/* Continue */}
        <View className="items-center flex-row justify-between ">
          <TouchableOpacity
            onPress={() => router.push("/Index")}
            className=" py-4 px-14 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-white font-normal">
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Index")}
            className="bg-white py-4 px-14 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-normal">
             Turn On
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // <SafeAreaView className="flex-1 bg-black px-6">
    //   <ProgressHeader step={14} total={14} type="onboardingBar" />
    //   <View className="flex-1 px-6 justify-center">
    //     <View>
    //       <Text className="text-white text-3xl font-bold mb-1">
    //         Set notification to stay tuned
    //       </Text>
    //       <Text className="text-boarderColor mb-4">
    //         Enable push notifications to stay updated on new campaigns and other
    //         exciting news.
    //       </Text>
    //     </View>

    //     <View className="flex-row items-center justify-between bg-[#1A1A1A] rounded-xl px-4 py-4 mb-10">
    //       <Text className="text-white text-base">Push Notifications</Text>
    //       <Switch
    //         value={notificationsEnabled}
    //         onValueChange={setNotificationsEnabled}
    //         trackColor={{ false: "#555", true: "#fff" }}
    //         thumbColor={notificationsEnabled ? "#000" : "#888"}
    //       />
    //     </View>

    //     <View className="items-center">
    //       <TouchableOpacity
    //         onPress={handleFinish}
    //         className="bg-white py-3 rounded-xl"
    //       >
    //         <Text className="text-center text-black font-semibold text-base">
    //           Skip
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         onPress={handleFinish}
    //         className="bg-white py-3 rounded-xl"
    //       >
    //         <Text className="text-center text-2xl text-black font-semibold">
    //           Turn On
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
}
