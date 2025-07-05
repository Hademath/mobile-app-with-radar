import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";

export default function DOBScreen() {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-20">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">
            What&apos;s your date of birth?
          </Text>
          <Text className="text-boarderColor mb-4">
            Select your date of birth.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          className="bg-[#1A1A1A] rounded-xl py-4 px-4 mb-10"
        >
          <Text className="text-boarderColor/45 text-2xl">
            {date ? date.toDateString() : "September 17, 2021"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date ?? new Date(2000, 0, 1)}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* <TouchableOpacity
          onPress={() => router.push("./Profiletype")}
          disabled={!date}
          className={`py-3 rounded-xl ${date ? "bg-white" : "bg-gray-600"}`}
        >
          <Text className="text-center text-black font-semibold text-base">
            Finish
          </Text>
        </TouchableOpacity> */}
        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./ProfileType")}
            // className="bg-white py-4 px-12 rounded-xl items-center"
            className={`py-4 px-12  rounded-xl ${date ? "bg-white" : ""}`}
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Finish up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
