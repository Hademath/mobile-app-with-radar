import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import StyledPicker from "@/app/components/StyledPicker";
import { addressSchema } from "@/schemas/registerSchema";
import useRegisterStore from "@/store/register-store";

export default function LocationScreen() {
  const router = useRouter();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const resident = {
    country: country,
    state: state,
    city: city,
}
      const {  updateData } = useRegisterStore();
      const handleNext = (val: string) => {
        const parsed = addressSchema.safeParse({ country: resident.country, state: resident.state, city: resident.city });
        if (!parsed.success) {
          alert(parsed.error.errors[0].message);
          return;
        }
        // console.log(parsed);
        router.push("/Registration/Gender");
        updateData({ country: resident.country, state: resident.state, city: resident.city });
      };

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />
      <View className="flex-1 relative mb-4 py-10">
        <View>
          <Text className="text-white text-2xl font-bold mb-1">
            What’s your Country of Residence?
          </Text>
          <Text className="text-boarderColor mb-4">
            Select your preferred country and city.
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* COUNTRY */}
          <StyledPicker
            zIndex={3000}
            value={country}
            onValueChange={setCountry}
            placeholder={{ label: "Country", value: null }}
            items={[
              { label: "Nigeria", value: "Nigeria" },
              { label: "Ghana", value: "Ghana" },
              { label: "USA", value: "USA" },
              { label: "Canada", value: "Canada" }, 
              { label: "UK", value: "UK" },
              { label: "South Africa", value: "South Africa" },
              { label: "Kenya", value: "Kenya" },
              { label: "Australia", value: "Australia" },
              { label: "India", value: "India" },
              { label: "Germany", value: "Germany" },
              { label: "France", value: "France" },
              { label: "Japan", value: "Japan" },
              { label: "China", value: "China" },
            ]}
          />
          {/* STATE */}
          <StyledPicker
            zIndex={2000}
            value={state}
            onValueChange={setState}
            placeholder={{ label: "State / Province / Region", value: null }}
            items={[
              { label: "Oyo", value: "Oyo" },
              { label: "Lagos", value: "Lagos" },
              { label: "Osogbo", value: "Osogbo" },
              { label: "Abuja", value: "Abuja" },
              { label: "Kano", value: "Kano" },
              { label: "Kaduna", value: "Kaduna" },
              { label: "Port Harcourt", value: "Port Harcourt" },
              { label: "Enugu", value: "Enugu" },
              { label: "Benin", value: "Benin" },
              { label: "Calabar", value: "Calabar" },
              { label: "Ibadan", value: "Ibadan" },
              { label: "Warri", value: "Warri" },
              { label: "Abeokuta", value: "Abeokuta" },
              { label: "Ilorin", value: "Ilorin" },
              { label: "Maiduguri", value: "Maiduguri" },
              { label: "Sokoto", value: "Sokoto" },
              { label: "Zaria", value: "Zaria" },
              { label: "Jos", value: "Jos" },
              { label: "Uyo", value: "Uyo" },
              { label: "Aba", value: "Aba" },
              { label: "Iwo", value: "Iwo" },
              { label: "Ikorodu", value: "Ikorodu" },
              { label: "Ikotun", value: "Ikotun" },
              { label: "Lekki", value: "Lekki" },
            ]}
          />

          {/* CITY */}
          <StyledPicker
            zIndex={1000}
            value={city}
            onValueChange={setCity}
            placeholder={{ label: "City", value: null }}
            items={[
              { label: "Ikeja", value: "Ikeja" },
              { label: "Surulere", value: "Surulere" },
              { label: "Maitama", value: "Maitama" },
              { label: "Victoria Island", value: "Victoria Island" },
              { label: "Lekki Phase 1", value: "Lekki Phase 1" },
              { label: "Yaba", value: "Yaba" },
              { label: "Ikoyi", value: "Ikoyi" },
              { label: "Gbagada", value: "Gbagada" },
              { label: "Festac", value: "Festac" },
              { label: "Ajah", value: "Ajah" },
              { label: "Ikeja GRA", value: "Ikeja GRA" },
              { label: "Maryland", value: "Maryland" },
              { label: "Ogba", value: "Ogba" },
              { label: "Agege", value: "Agege" },
            ]}
          />
          <View className="items-center mt-3 ">
            <TouchableOpacity
              onPress={() => handleNext(city)}
              className="bg-white py-3 px-12 rounded-xl items-center"
            >
              <Text className="text-center text-2xl text-black font-semibold">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


// const pickerStyles = {
//   inputIOS: {
//     backgroundColor: "#1A1A1A",
//     color: "#fff",
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 16,
//   },
//   inputAndroid: {
//     backgroundColor: "#1A1A1A",
//     color: "#888",
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 16,
//   },
//   placeholder: {
//     color: "#888",
//   },
//   iconContainer: {
//     top: 20,
//     right: 16,
//   },
//   inputAndroidContainer: {
//     backgroundColor: "#1A1A1A",
//     borderRadius: 8,
//   },
// };
