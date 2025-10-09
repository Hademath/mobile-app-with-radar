// app/register/06-password.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import useResetPassStore from "@/store/reset-password-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import { resetpasswordSchema } from "@/schemas/loginSchema";



export default function PasswordScreen() {
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [visible, setVisible] = useState(false);
      const [conVisible, setConVisible] = useState(false);
      const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string; }>({});

      const router = useRouter();
      // const API = new AuthEndpoints();
      const { data, updateData } = useResetPassStore();

      const { isPending, mutate } = useDataMutation({
        mutationFn: ( payload: typeof data & { newPassword: string; confirmPassword: string } ) => AuthEndpoints.resetPassword(payload),
        mutationKey: ["reset-password"],
      });

      const handleSubmit = () => {
        let validationErrors: { newPassword?: string; confirmPassword?: string } =
          {};

        // Validate with schema
        const parsed = resetpasswordSchema.safeParse({ newPassword });
        if (!parsed.success) {
           setErrors({ newPassword: parsed.error.errors[0].message });
        }

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        setErrors({}); // clear old errors

        // payload with store data + new password
        const payload = {
          ...data,
          newPassword,
          confirmPassword,
        };

        updateData({ newpassword: newPassword }); // keep store in sync

        mutate(payload, {
          onSuccess: async (res) => {
            router.push("/Login/LoginScreen");
            alert(res?.data?.message || "Password reset successful!");
          },
          onError: (err: any) => {
            const msg =
              err?.response?.data?.message || err.message || "Failed to reset password. Please try again.";
            alert(msg);
          },
        });
      };
        

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />
      <View className="flex-1 py-10">
        <Text className="text-white text-2xl font-bold mb-1">
          Create new password
        </Text>
        <Text className="text-boarderColor mb-4">
          Create a password you wouldn’t forgot this time.
        </Text>

        <View className="mb-2">
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
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

        {errors.newPassword && (
          <Text className="text-tertiary mb-2">{errors.newPassword}</Text>
        )}

        <View className=" mb-2">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confrim Password"
            placeholderTextColor="#888"
            secureTextEntry={!conVisible}
            autoCapitalize="none"
            className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-4"
          />
          <TouchableOpacity
            onPress={() => setConVisible(!conVisible)}
            className="absolute right-5 top-3"
          >
            {conVisible ? ( <EyeOff size={26} color="gray" /> ) : ( <Eye size={26} color="gray" /> )}
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-tertiary mb-2">{errors.confirmPassword}</Text>
        )}

        <View className="items-center">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-white py-4 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              {isPending ? "Resetting..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
