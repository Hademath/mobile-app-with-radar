import { View, Text, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import ArtisteSecondaryLogo from "../../../assets/images/svgs/ArtisteSecondaryLogo";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <ImageBackground
      source={require("@/assets/images/GetStartedBackground.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 justify-end p-6 bg-black/40">
        <View className="bg-black/70 p-6 rounded-3xl">
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
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#888"
              className="bg-boarderColor/30 text-white px-4 py-5 rounded-xl"
            />
          </View>
          <View className="relative ">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!visible}
              autoCapitalize="none"
              className="bg-boarderColor/30 text-white px-4 py-5 rounded-xl mb-2"
            />
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
            <Text className="text-white"> Remember Me</Text>
            <TouchableOpacity onPress={() => router.push("./ForgotPassword")}>
              <Text className=" text-white underline">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/Index")}
            className="bg-secondary py-3 rounded-xl mb-3"
          >
            <Text className="text-center text-black font-semibold text-base">
              Login
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-center text-base mb-4">Or</Text>
          <SocialButton
            Icon={icons.YoutubeIcon}
            text="Login with YouTube Music"
          />
          <SocialButton Icon={icons.AppleMusic} text="Login with Apple Music" />
          <SocialButton Icon={icons.SpotifyIcon} text="Login with Spotify" />
          <TouchableOpacity onPress={() => router.push("/Registration/GetStarted") } className="mt-6">
            <Text className="text-center text-white  text-xl">
              Sign up free
            </Text>
          </TouchableOpacity>
        </View>
        <View className="justify-center items-center mt-3 px-6">
          {/* <Text className="text-white font-light text-lg text-center leading-6">
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
          </Text> */}
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
