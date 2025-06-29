import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import StyledPicker from "@/app/components/StyledPicker";

export default function LocationScreen() {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-20">
        <View>
          <Text className="text-white text-2xl font-bold mb-1">
            What’s your Country of Residence?
          </Text>
          <Text className="text-boarderColor mb-4">
            Select your preferred country and city.
          </Text>
        </View>

        {/* COUNTRY */}
        <StyledPicker
          value={country}
          onValueChange={setCountry}
          placeholder={{ label: "Country", value: null }}
          items={[
            { label: "Nigeria", value: "Nigeria" },
            { label: "Ghana", value: "Ghana" },
            { label: "USA", value: "USA" },
          ]}
        />
        {/* STATE */}
        <StyledPicker
          value={state}
          onValueChange={setState}
          placeholder={{ label: "State / Province / Region", value: null }}
          items={[
            { label: "Oyo", value: "Oyo" },
            { label: "Lagos", value: "Lagos" },
            { label: "Osogbo", value: "Osogbo" },
          ]}
        />

        {/* CITY */}
        <StyledPicker
          value={city}
          onValueChange={setCity}
          placeholder={{ label: "City", value: null }}
          items={[
            { label: "Ikeja", value: "Ikeja" },
            { label: "Surulere", value: "Surulere" },
            { label: "Maitama", value: "Maitama" },
          ]}
        />

        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./Gender")}
            className="bg-white py-4 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ✨ STYLES to mimic Tailwind input look
const pickerStyles = {
  inputIOS: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  inputAndroid: {
    backgroundColor: "#1A1A1A",
    color: "#888",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  placeholder: {
    color: "#888",
  },
  iconContainer: {
    top: 20,
    right: 16,
  },
  inputAndroidContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
  },
};
