import { View, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import ArtisteSecondaryLogo from "../../../assets/images/svgs/ArtisteSecondaryLogo";
import React,  { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "@/providers/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/schemas/loginSchema";

export default function LoginScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

    const { login, isPending } = useAuth();

    const { handleSubmit, setValue, formState: { errors }, } = useForm<loginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: "",
        remember_me: false,
      },
    });

  function onLogin(val: loginType) {
      login(val);
    }

    // sync state with form so zod can validate
  const handleEmailChange = (text: string) => {
      setEmail(text);
      setValue("email", text, { shouldValidate: true });
    };

    const handlePasswordChange = (text: string) => {
      setPassword(text);
      setValue("password", text, { shouldValidate: true });
    };

  return (
    <ImageBackground
      source={require("@/assets/images/GetStartedBackground.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 justify-end px-6  bg-black/40">
        <View className="bg-black/70 p-6  rounded-3xl">
          <ArtisteSecondaryLogo />
          <View>
            <Text className="text-white font-clash text-3xl  font-bold  mb-2 mt-4">
              Log In
            </Text>
            <Text className="text-white text-base mb-6">
              Login to gain access to Radar.
            </Text>
          </View>

          <View className="mb-4">
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Email"
              placeholderTextColor="#888"
              className="bg-boarderColor/30 text-white px-4 py-5 rounded-xl"
            />

            {errors.email && (
              <Text className="text-red-500 text-[10px]">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View className="relative ">
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!visible}
              autoCapitalize="none"
              className="bg-boarderColor/30 text-white px-4 py-5 rounded-xl mb-2"
            />
            {errors.password && (
              <Text className="text-red-500 text-[10px] ">
                {errors.password.message}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              className="absolute right-5 top-3"
            >
              {visible ? (
                <EyeOff size={26} color="white" />
              ) : (
                <Eye size={26} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => {
                  const newValue = !rememberMe;
                  setRememberMe(newValue);
                  setValue("remember_me", newValue, { shouldValidate: true });
                }}
                className={`w-4 h-4 border rounded mr-2 items-center justify-center ${
                  rememberMe
                    ? "border-secondary bg-secondary"
                    : "border-gray-400"
                }`}
              >
                {rememberMe && (
                  <Check size={12} color="white" strokeWidth={2} />
                )}
              </TouchableOpacity>

              <Text className="text-white">Remember Me</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("./ForgotPassword")}>
              <Text className=" text-white underline">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <Text className="text-red-500 text-[10px] ">{error}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => handleSubmit(onLogin)()}
            disabled={isPending}
            className="bg-secondary py-3 rounded-xl mb-3"
          >
            <Text className="text-center text-black font-semibold text-base">
              {isPending ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-center text-base mb-4">Or</Text>
          <SocialButton
            Icon={icons.YoutubeIcon}
            text="Login with YouTube Music"
          />
          <SocialButton Icon={icons.AppleMusic} text="Login with Apple Music" />
          <SocialButton Icon={icons.SpotifyIcon} text="Login with Spotify" />
          <TouchableOpacity
            onPress={() => router.push("/Registration/GetStarted")}
            className="mt-6"
          >
            <Text className="text-center text-white  text-xl">
              Sign up free
            </Text>
          </TouchableOpacity>
        </View>
        <View className="justify-center items-center mt-3 px-6">
          <Text className="text-white font-light text-lg text-center leading-6">
            By signing up, you are creating a Radar account and agree to Radar’s{" "}
            <Text
              className="text-secondary"
              onPress={() => router.push("./terms")}
            >
              Terms
            </Text>{" "}
            and{" "}
            <Text
              className="text-secondary"
              onPress={() => router.push("./privacy")}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function SocialButton({ Icon, text }: { Icon: React.FC<any>; text: string }) {
  return (
    <TouchableOpacity className="flex-row  items-center  bg-[#1A1A1A]  border border-boarderColor/25 py-3 px-6 w-full rounded-xl mb-3 ">
      <Icon />
      <Text className="text-white text-xl items-start ml-5">{text}</Text>
    </TouchableOpacity>
  );
}
