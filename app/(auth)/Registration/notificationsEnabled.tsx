import { Image,  Alert, View, Text, TouchableOpacity, TouchableWithoutFeedback, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressHeader from "../../components/ProgressHeader";
import { useRouter } from "expo-router";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import useProfileSetupStore from "@/store/profilesetup-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import { notificationSchema, } from "@/schemas/registerSchema";
import React from "react";
// import { ICreateProfile } from "@/utils/types";


// const { width } = Dimensions.get("window");
// const CARD_WIDTH = (width - 48 - 16) / 4;

export default function NotificationScreen() {
  const router = useRouter();
  // const API = new AuthEndpoints();
  const { data } = useProfileSetupStore();

  // setup mutation
  // mutation setup
  const { isPending, mutate } = useDataMutation({
    mutationFn: (payload: typeof data & { notification: boolean } | any) => AuthEndpoints.profileSetup(payload),
    mutationKey: ["profile-setup"],
  });

  const finishUp = (notification: boolean) => {
    const parsed = notificationSchema.safeParse({
      notification: notification,
    });
    if (!parsed.success) {
      Alert.alert("Validation error", parsed.error.errors[0].message);
      return;
    }

    // payload from current store data + notification
    const payload = {
      ...data,
      notification,
    };
    // build FormData
    let formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "profile") {
        if (payload.avatarType === "upload" && typeof value === "string") {
          formData.append("profile", {
            uri: value,
            name: "profile.jpg",
            type: "image/jpeg",
          } as any);
        } else {
          formData.append("profile", value as any);
        }
      } else if (Array.isArray(value)) {
        value.forEach((v) => {
          formData.append(`${key}[]`, v);
        });
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    mutate(formData, {
      onSuccess: async (res) => {
        Alert.alert("Success", res?.data?.message || "Registration successful!");
        router.push("/(tabs)");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err.message || "Failed to update user profile. Please try again.";
        Alert.alert("Error", msg);
      },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
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
            onPress={() => finishUp(false)}
            className=" py-4 px-14 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-white font-normal">
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => finishUp(true)}
            className="bg-white py-4 px-14 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-normal">
              {isPending ? "finalizing..." : "Turn on"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
