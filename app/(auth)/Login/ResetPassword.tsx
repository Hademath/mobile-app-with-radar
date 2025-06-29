// app/register/06-password.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-20">
        <Text className="text-white text-2xl font-bold mb-1">
          Create new password
        </Text>
        <Text className="text-boarderColor mb-4">
          Create a password you wouldn’t forgot this time.
        </Text>

        <View className="relative mb-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!visible}
            autoCapitalize="none"
            className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-4"
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

        <View className="relative mb-8">
          <TextInput
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            placeholder="Confrim Password"
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
            onPress={() => router.push("./Residential")}
            className="bg-white py-4 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
