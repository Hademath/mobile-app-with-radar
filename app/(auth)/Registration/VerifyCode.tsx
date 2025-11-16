import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import useRegisterStore from "@/store/register-store";



export default function OTPVerifyScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const { data } = useRegisterStore();
  // const API = new AuthEndpoints();

  // Verify OTP mutation
  const { isPending, mutate } = useDataMutation({
    mutationFn: (data: { otp: string; email: string }) => AuthEndpoints.verifyEmail(data),
    mutationKey: ["verify email"],
  });

  // Resend OTP 
    const reason = "register";
  const { mutate: resendOtpMutation } = useDataMutation({
    mutationFn: (email: string) => AuthEndpoints.requestOtp(reason, email),
    mutationKey: ["request otp"],
  });

  
  // console.log("Current registration data:", data);

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

  // Auto-submit when 6 digits are filled
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && !otp.includes("")) {
      onSubmit(code);
    }
  }, [onSubmit, otp]);

 // eslint-disable-next-line react-hooks/exhaustive-deps
 function onSubmit(code: string) {
   if (isPending) return;
   setErrorMsg("");

   mutate(
     { otp: code, email: data.email },
     {
       onSuccess: (res) => {
           alert(res.data.message);
         // store OTP if needed
         // updateData({ otp: code });
         setOtp(["", "", "", "", "", ""]);
         router.push("/Registration/Password");
       },
       onError: (err: any) => {
         const msg = err?.response?.data?.message || err.message || "Invalid OTP. Please try again";
         setErrorMsg(msg);
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
      const msg = err?.response?.data?.message || err.message || "Failed to resend OTP. Please try again.";
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
    <SafeAreaView className="flex-1 bg-primary">
      <View className="px-6">
        <CreateAccountHeader />
      </View>
      <View className="flex-1 px-6 py-10">
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
              editable={!isPending}
              className="w-12 h-14 text-white/55 text-2xl mb-10 bg-[#1A1A1A] rounded-xl text-center"
            />
          ))}
        </View>

        {/* Error */}
        {errorMsg ? (
          <Text className="text-red-500 mb-4">{errorMsg}</Text>
        ) : null}



        <View className="flex gap-4 mb-7">
          <View className="flex flex-row w-full justify-between">
            {startTimer ? (
              <Text className="text-white">
                Resend code in{" "}
                <Text className="text-boarderColor/45">{timer} sec</Text>
              </Text>
            ) : (
              <TouchableOpacity
                onPress={resendOtp}
                disabled={isPending} 
              >
                <Text className="text-boarderColor/45">
                  {isPending ? "Verifying..." : "Resend code"}
                </Text>
              </TouchableOpacity>
            )}
                    {/* Loader */}
            {isPending && (
              <ActivityIndicator size="small" color="white" className="mb-4" />
            )}
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
      </View>
    </SafeAreaView>
  );
}
