// app/register/06-password.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import { z } from "zod";

const passwordSchema = z.object({
    password: z .string() .min(8, { message: "Password must be at least 8 characters long" }),
    confirmpassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
})

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
    
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const router = useRouter();
    
    const handleSubmit = () => {
        const result = passwordSchema.safeParse({ password, confirmpassword });
        if (!result.success) {
            const fieldErrors: { password?: string; confirmPassword?: string } = {};
            result.error.errors.forEach((error) => {
                if (error.path.includes("password")) {
                    fieldErrors.password = error.message;
                } else if (error.path.includes("confirmpassword")) {
                    fieldErrors.confirmPassword = error.message;
                }
            });
            setErrors(fieldErrors);
        } else {
            setErrors({});
            router.push("./Residential");
        }
    }

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-20">
        <Text className="text-white text-2xl font-bold mb-1">
          Create new password
        </Text>
        <Text className="text-boarderColor mb-4">
          Create a password you wouldn’t forgot this time.
        </Text>

        <View className="mb-2">
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

        {errors.password && (
          <Text className="text-red-500 mb-1">{errors.password}</Text>
        )}

        <View className=" mb-2">
          <TextInput
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            placeholder="Confrim Password"
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
        {errors.confirmPassword && (
          <Text className="text-red-500 text-sm mb-1">
            {errors.confirmPassword}
          </Text>
        )}

        <View className="items-center">
          <TouchableOpacity
            // onPress={() => router.push("./Residential")}
            onPress={handleSubmit}
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
