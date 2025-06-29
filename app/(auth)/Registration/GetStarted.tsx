import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import ArtisteSecondaryLogo from "../../../assets/images/svgs/ArtisteSecondaryLogo";


export default function GetStartedScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/GetStartedBackground.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 justify-end p-6 bg-black/40">
        <View className="bg-black/70 p-6 rounded-3xl">
          <ArtisteSecondaryLogo   />
          <Text className="text-white font-clash text-3xl  font-bold  mb-2 mt-4">
            Get Started
          </Text>
          <Text className="text-white text-base mb-6">
            Sign up to gain access to Radar.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("./FirstName")}
            className="bg-secondary py-3 rounded-xl mb-3"
          >
            <Text className="text-center text-black font-semibold text-base">
              Sign up free
            </Text>
          </TouchableOpacity>
          <SocialButton Icon={icons.YoutubeIcon} text="Sign up with YouTube Music" />
          <SocialButton Icon={icons.AppleMusic} text="Sign up with Apple Music" />
          <SocialButton Icon={icons.SpotifyIcon} text="Sign up with Spotify" />
          <TouchableOpacity onPress={() => router.push('../Login/LoginScreen')} className="mt-6">
            <Text className="text-center text-white  text-xl">Log in</Text>
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
      <Text className="text-white text-xl items-start ml-5">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
