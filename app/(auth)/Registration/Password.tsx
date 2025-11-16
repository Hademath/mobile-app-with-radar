// app/register/06-password.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React,{ useState } from "react";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import useRegisterStore from "@/store/register-store";
import { passwordSchema } from "@/schemas/registerSchema";

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

    const { updateData } = useRegisterStore();
    const handleNext = (val: string) => {
      const parsed = passwordSchema.safeParse({ password: val });
      if (!parsed.success) {
        alert(parsed.error.errors[0].message);
        return;
      }
      console.log(parsed);
      router.push("/Registration/Residential");
      updateData({ password: val });
    };
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-10">
        <Text className="text-white text-2xl font-bold mb-1">
          Create a password
        </Text>
        <Text className="text-boarderColor mb-4">
          Must be at least 8 characters.
        </Text>

        <View className="relative mb-8">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!visible}
            autoCapitalize="none"
            className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-20"
          />
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            className="absolute right-5 top-3"
          >
            {visible ? (
              <EyeOff size={26} color="gray" />
            ) : (
              <Eye size={26} color="gray" />
            )}
          </TouchableOpacity>
        </View>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => handleNext(password)}
            className="bg-white py-3 px-12 rounded-xl items-center"
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
