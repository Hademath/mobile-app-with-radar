import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import { emailSchema } from "@/schemas/registerSchema";
import useResetPassStore from "@/store/reset-password-store";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  
  const API = new AuthEndpoints();
  const { updateData } = useResetPassStore();
  //  OTP request mutation
  const { isPending, mutate } = useDataMutation({
    mutationFn: (email: string) => API.forgotPassword({email}),
    mutationKey: ["forgot password"],
  });

  const handleNext = (val: string) => {
    const parsed = emailSchema.safeParse({ email: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    mutate(val, {
      onSuccess: (res) => {
        alert(res.data.message);
        updateData({ email: val });
        router.push("./CodeVerification");
      },
      onError: (err: any) => {
        alert( "Failed to send OTP: " + err?.response?.data?.message || err.message || err );
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader headerTitle="Reset Password" />
      <View className="flex-1 py-20">
        <Text className="text-white text-2xl font-bold mb-1">
          What’s your email?
        </Text>
        <Text className="text-boarderColor mb-4">
          A verification code will be sent to your email.
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#888"
          className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-20"
        />

        <View className="items-center">
          <TouchableOpacity
            disabled={isPending}
            onPress={()=>handleNext(email)}
            className="bg-white py-4 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              {isPending ? "Sending..." : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
