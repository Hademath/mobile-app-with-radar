import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { dateSchema } from "@/schemas/registerSchema";
import useRegisterStore from "@/store/register-store";
import {useAuthStore} from "@/store/auth-store";
import { IUserData } from "@/types/userTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function DOBScreen() {
      const { setUser } = useAuthStore();
      const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
      const [showPicker, setShowPicker] = useState(false);
      const router = useRouter();

      const handleDateChange = (_event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === "ios");
        if (selectedDate) {
          setDateOfBirth(selectedDate);
        }
      };

      // const API = new AuthEndpoints();
      const { data, updateData } = useRegisterStore();

      // Register User mutation
      const { isPending, mutate } = useDataMutation({
        mutationFn: (payload: Omit<typeof data, "dateOfBirth"> & { dateOfBirth: string }) => AuthEndpoints.registerUser(payload),
        mutationKey: ["register user"],
      });

    const finishUp = () => {
      if (!dateOfBirth) return;

      const parsed = dateSchema.safeParse({ dateOfBirth });
      if (!parsed.success) {
        alert(parsed.error.errors[0].message);
        return;
      }

      //payload from current store data + latest date
      const payload = {
        ...data,
        dateOfBirth: dateOfBirth.toISOString(),
      };

      // keep store in sync (optional)
      updateData({ dateOfBirth: dateOfBirth });

      mutate(payload, {
        onSuccess: async (res) => {
        const user = res?.data?.data as IUserData;

          if (res.data.status_code === 201 && user?.token) {
            await AsyncStorage.setItem("user", JSON.stringify(res?.data?.data));
            await AsyncStorage.setItem("account-exists", JSON.stringify(true));
            setUser(user);
            alert(res?.data.message || "Registration successful!");
            router.push("/Registration/ProfileType");
          }
        },
        onError: (err: any) => {
          // console.log("Registration error", err);
          const msg = err?.response?.data?.message || err.message || "Failed to register user. Please try again.";
          alert(msg);
        },
      });
    };
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
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
            {dateOfBirth ? dateOfBirth.toDateString() : "September 17, 2021"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dateOfBirth ?? new Date(2000, 0, 1)}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <View className="items-center">
          <TouchableOpacity
            onPress={finishUp}
            disabled={!dateOfBirth || isPending}
            // className="bg-white py-4 px-12 rounded-xl items-center"
            className={`py-4 px-12  rounded-xl ${
              dateOfBirth ? "bg-white" : "bg-gray-600"
            }`}
          >
            <Text className="text-center text-2xl text-black font-semibold">
             {isPending? "Registering.." :"Finish up"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
