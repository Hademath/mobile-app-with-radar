import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import useRegisterStore from "@/store/register-store";



export default function OTPVerifyScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [startTimer, setStartTimer] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();
  const { updateData } = useRegisterStore();
  const data = useRegisterStore((state) => state.data);
	const API = new AuthEndpoints();

  // 🔹 Verify OTP mutation
  const { isPending, mutate } = useDataMutation({
    mutationFn: API.verifyEmail,
    mutationKey: ["verify email"],
  });

  // 🔹 Resend OTP mutation
  const { mutate: resendOtpMutation } = useDataMutation({
    mutationFn: API.resendOtp,
    mutationKey: ["resend otp"],
  });

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

  // 🔹 Auto-submit when 6 digits are filled
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && !otp.includes("")) {
      onSubmit(code);
    }
  }, [otp]);

  function onSubmit(code: string) {
    setErrorMsg("");
    mutate(
      { otp: code }, // match your API shape
      {
        onSuccess: (res) => {
          console.log("OTP verify success:", res);
          if (res?.data?.status) {
            updateData({ otp: code });
            setOtp(["", "", "", "", "", ""]);
            router.push("/Registration/Password");
          }
        },
        onError: (err: any) => {
          console.log("OTP verify error:", err);
          setErrorMsg("Invalid OTP. Please try again.");
          setOtp(["", "", "", "", "", ""]);
          inputs.current[0]?.focus();
        },
      }
    );
  }

  // 🔹 Resend OTP
  function resendOtp() {
    resendOtpMutation(data.email, {
      onSuccess: () => {
        setTimer(60);
        setStartTimer(true);
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
              className="w-12 h-14 text-white text-2xl mb-10 bg-[#1A1A1A] rounded-xl text-center"
            />
          ))}
        </View>

        {/* Error */}
        {errorMsg ? <Text className="text-red-500 mb-4">{errorMsg}</Text> : null}

        {/* Loader */}
        {isPending && (
          <ActivityIndicator size="small" color="white" className="mb-4" />
        )}

        <View className="flex gap-4 mb-7">
          <View className="flex flex-row w-full justify-between">
            {startTimer ? (
              <Text className="text-white">
                Resend code in{" "}
                <Text className="text-boarderColor/45">{timer} sec</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={resendOtp}>
                <Text className="text-boarderColor/45">Resend code</Text>
              </TouchableOpacity>
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

// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";
// import { useState, useRef, use, useEffect } from "react";
// import CreateAccountHeader from "@/app/components/CreateAccountHeader";

// export default function OTPVerifyScreen() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [startCountDown, setStartCountDown] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const inputs = useRef<(TextInput | null)[]>([]);
//   const router = useRouter();

//   const handleChange = (text: string, index: number) => {
//     if (/^\d$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       if (index < 5) {
//         inputs.current[index + 1]?.focus();
//       }
//     }
//   };

//      useEffect(() => {
//        let interval: NodeJS.Timeout;
//        if (startCountDown && timer > 0) {
//          interval = setInterval(() => {
//            setTimer((prevTimer) => prevTimer - 1);
//          }, 1000);
//        } else if (timer === 0) {
//          setStartCountDown(false);
//        }
//        return () => clearInterval(interval);
//      }, [startCountDown, timer]);
//     const countDown = (value: any) => {
//       setStartCountDown(value);
//       setTimer(60);
//     };

//   return (
//     <SafeAreaView className="flex-1 bg-primary">
//       <View className="px-6">
//         <CreateAccountHeader />
//       </View>
//       <View className="flex-1 px-6 py-10">
//         <Text className="text-white text-2xl font-bold mb-1">
//           Input the 6-digit code.
//         </Text>
//         <Text className="text-boarderColor/45 mb-4">
//           A 6-digit code has been sent to the email provided.
//         </Text>

//         <View className="flex-row justify-between ">
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => {
//                 inputs.current[index] = ref;
//               }}
//               value={digit}
//               onChangeText={(text) => handleChange(text, index)}
//               keyboardType="numeric"
//               maxLength={1}
//               className="w-12 h-14 text-white text-2xl mb-10 bg-[#1A1A1A] rounded-xl text-center"
//             />
//           ))}
//         </View>
//         <View className="flex gap-4  mb-7">
//           <View className="flex flex-row w-full justify-between">
//             {/* <Text className="text-white">
//               Resend code  <Text className="text-boarderColor/45">{timer}s</Text>
//             </Text>
//             <LoaderCircle size={16} color={"gray"} className="text-white" /> */}
//           {startCountDown ? (
//             <Text className="text-white">
//               Resend code in{" "}
//               <Text className="text-boarderColor/45">{timer} sec</Text>
//             </Text>
//           ) : (
//             <TouchableOpacity onPress={() => countDown(true)}>
//               <Text className="text-boarderColor/45">Resend code</Text>
//             </TouchableOpacity>
//           )}
//           </View>

//           <Text className="text-white">
//             Didn’t get a code?{" "}
//             <TouchableOpacity
//               onPress={() => router.push("/Registration/Email")}
//             >
//               <Text className="text-boarderColor/45">
//                 {" "}
//                 Change email address
//               </Text>
//             </TouchableOpacity>
//           </Text>
//         </View>

//        <View className="items-center">
//           <TouchableOpacity
//             onPress={() => router.push("./Password")}
//             className="bg-white py-3 px-12 rounded-xl items-center"
//           >
//             <Text className="text-center text-2xl text-black font-semibold">
//               Next
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }
