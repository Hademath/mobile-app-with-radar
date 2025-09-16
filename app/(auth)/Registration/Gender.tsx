import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import useRegisterStore from "@/store/register-store";
import { genderSchema } from "@/schemas/registerSchema";
const genders = ["Male", "Female"];

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const router = useRouter();
  const {  updateData } = useRegisterStore();
  const handleNext = (val: string) => {
    const parsed = genderSchema.safeParse({ gender: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }
    // console.log(parsed);
    router.push("/Registration/DateOfBirth");
    updateData({ gender: val });
  };
      
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-20 ">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">
            What&apos;s your gender?
          </Text>
          <Text className="text-boarderColor mb-4">
            Select your preferred gender.
          </Text>
        </View>

        <View className=" flex flex-row gap-10 space-y-4 mb-16">
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender}
              onPress={() => setSelectedGender(gender)}
              className={`py-3 rounded-2xl  px-8 ${
                selectedGender === gender
                  ? "bg-white"
                  : "bg-[#1A1A1A] border border-boarderColor/25"
              }`}
            >
              <Text
                className={`text-center text-base font-medium ${
                  selectedGender === gender ? "text-black" : "text-white"
                }`}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => {
              if (selectedGender) {
                handleNext(selectedGender);
              }
            }}
            disabled={!selectedGender}
            className={`py-4 px-14 items-center rounded-xl ${
              selectedGender ? "bg-white" : ""
            }`}
          >
            <Text className="text-center text-2xl text-primary font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
