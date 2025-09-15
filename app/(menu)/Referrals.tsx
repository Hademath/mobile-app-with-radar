import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Copy } from "lucide-react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Referrals() {
  const router = useRouter();


  return (
    <ScrollView className="flex-1 bg-primary px-4 pt-14">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-white items-center text-2xl font-bold">
          Referrals
        </Text>
        <Text></Text>
      </View>

      <View className="flex-row justify-between mb-6">
        <View className=" bg-accent p-6 gap-3 rounded-2xl w-[48%]">
          <Text className="text-white font-semibold mb-1">Pending reward</Text>
          <View className="flex-row gap-1">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-bold text-lg">6000.00</Text>
          </View>
        </View>
        <View className="bg-accent p-6 gap-3 rounded-2xl w-[48%]">
          <Text className="text-white font-semibold mb-1">You’ve earned</Text>
          <View className="flex-row gap-1">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-white font-bold text-lg">10000.00</Text>
          </View>
        </View>
      </View>

      <View className="bg-neutral-900 p-4 rounded-2xl mb-6 ">
        <View className="items-center py-3">
          <View className="flex-row space-x-[-10px] mb-2 items-center">
            {["#0ff", "#f90", "#fa0", "#fff"].map((color, index) => (
              <View
                key={index}
                className={`w-10 h-10 rounded-full border-2 border-black -ml-${
                  index + 1
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </View>
        </View>
        <View>
          <View className="flex-row justify-between">
            <Text className="text-white font-semibold mb-2">
              Total Referred
            </Text>
            <Text className="text-white font-semibold mb-2">
              5 friends referred
            </Text>
          </View>

          <View className="w-full h-6 bg-white/50 rounded-full mb-2">
            <View className="h-full bg-secondary rounded-full w-[40%]" />
          </View>
          <View className="justify-center items-center">
            <Text className="text-text text-sm. pt-2">
              2 out of 5 referrals completed
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View className="flex-row justify-between items-center mb-4 px-1">
          <Text className="text-white font-bold text-xl">Referral History</Text>
          <TouchableOpacity>
            <FontAwesome6 name="circle-arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-tertiary text-sm mb-4 mr-5">
          Get your friends to complete their tasks so you can get your referral
          rewards.
        </Text>

        <View className="flex-row  mb-6 gap-4 ">
          <TouchableOpacity className="bg-white px-4 py-3 rounded-full">
            <Text className="text-black font-bold">Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-completedButton px-4 py-3 rounded-full">
            <Text className="text-white font-bold">Completed</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-tertiary mb-8 mt-4">
          You have no pending referrals
        </Text>
      </View>
      <View className="bg-accent/30 h-full w-full">
        <View className="flex-row justify-between items-center m-4 ">
          <View className="bg-neutral-900 px-4 py-3 rounded-xl  justify-between w-[48%]">
            <Text className="text-white text-sm">Your Referral code</Text>
            <View className="flex-row w-full justify-between">
              <Text className="text-white font-semibold">U83H8hd</Text>
              <Copy color="#40E0D0" size={10} />
            </View>
          </View>
          <TouchableOpacity className="bg-white px-4 py-5 rounded-xl w-[48%] items-center">
            <Text className="text-black font-semibold">Share</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center mt-10 ">
          <View className="w-[50%] items-center h-2 bg-white/50 rounded-full mb-2">
            <View className="h-full bg-white rounded-full w-[100%]" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
