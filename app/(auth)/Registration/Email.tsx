// app/register/04-email.tsx
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";

import RegistrationStepProps from "../../components/RegistrationStep";

export default function EmailScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <RegistrationStepProps
        title="What's your email"
        description="Please enter your email address."
        placeholder="Email"
        nextLabel="Next"
        onNext={(val) => {
          router.push("/Registration/VerifyCode");
        }}
      />

    </SafeAreaView>
  );
}
