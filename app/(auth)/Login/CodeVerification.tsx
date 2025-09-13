import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import { LoaderCircle } from "lucide-react-native";
import useResetPassStore from "@/store/reset-password-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import AuthEndpoints from "@/endpoints/authEndpoints";

export default function CodeVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
    const [timer, setTimer] = useState(60);
    const [startTimer, setStartTimer] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const { data, setData, updateData } = useResetPassStore();
  const API = new AuthEndpoints();

  // Verify OTP mutation
  const { isPending, mutate } = useDataMutation({
    mutationFn: (data: { token: string; }) => API.verifyForgotPassOtp(data),
    mutationKey: ["verify otp"],
  });

  // Resend OTP
  const { mutate: resendOtpMutation } = useDataMutation({
    mutationFn: (email: string) => API.forgotPassword({email}),
    mutationKey: ["request otp"],
  });


  // Auto-submit when 6 digits are filled
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && !otp.includes("")) {
      onSubmit(code);
    }
  }, [otp]);

  function onSubmit(code: string) {
    if (isPending) return;
    setErrorMsg("");

    mutate(
      { token: code, },
      {
        onSuccess: (res) => {
          alert(res.data.message);
          updateData({ token: code });
          setOtp(["", "", "", "", "", ""]);
          router.push("./ResetPassword");
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || err.message || "Invalid OTP. Please try again"; setErrorMsg(msg);
          setOtp(["", "", "", "", "", ""]);
          inputs.current[0]?.focus();
        },
      }
    );
  }

  //  Resend OTP
  function resendOtp() {
    if (startTimer) return; // block spamming
    setErrorMsg("");

    resendOtpMutation(data.email, {
      onSuccess: (res) => {
        // console.log("OTP resent ");
        setTimer(60);
        setStartTimer(true);
        alert("A new OTP has been sent to your email.");
      },
      onError: (err: any) => {
        // console.log("Resend OTP failed:", err);
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Failed to resend OTP. Please try again.";
        setErrorMsg(msg);
      },
    });
  }

  // 🔹 Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setStartTimer(false);
    }
    return () => clearInterval(interval);
  }, [startTimer, timer]);

  return (
    <SafeAreaView className="flex-1 bg-black ">
      <View className="px-6">
        <CreateAccountHeader headerTitle="Reset Password" />
      </View>
      <View className="flex-1 px-6 py-20">
        <Text className="text-white text-2xl font-bold mb-1">
          Input the 6-digit code.
        </Text>
        <Text className="text-boarderColor/45 mb-4">
          A 6-digit code has been sent to the email provided.
        </Text>

        <View className="flex-row justify-between ">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              className="w-12 h-14 text-white text-2xl mb-10 bg-[#1A1A1A] rounded-xl text-center"
            />
          ))}
        </View>
        <View className="flex gap-4  mb-7">
          <View className="flex flex-row w-full justify-between">
            <Text className="text-white">
              Resend code <Text className="text-boarderColor/45">39s</Text>
            </Text>
            <LoaderCircle size={16} color={"gray"} className="text-white" />
          </View>
          <Text className="text-white">
            Didn’t get a code?{" "}
            <TouchableOpacity
              onPress={() => router.push("/Registration/Email")}
            >
              <Text className="text-boarderColor/45">
                {" "}
                Change email address
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./ResetPassword")}
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

