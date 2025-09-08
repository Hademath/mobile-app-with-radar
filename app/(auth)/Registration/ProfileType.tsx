import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
// import ProgressHeader from "../../components/ProgressHeader";
import ArtisteLogo3 from "../../../assets/images/svgs/ArtisteLogo3";
import icons from "@/constants/icons";

interface profilePop {
  id: string,
  label:string
  description:string
  emoji:React.ReactNode

}

const profileTypes  = [
  {
    id: "listener",
    label: "Listeners",
    description:"Earn and redeem rewards by listening  to music and giving feedback in split seconds. ",
    emoji: <ArtisteLogo3 />,
  },
  {
    id: "artiste",
    label: "Artistes",
    description:
      "Run feedback campaigns, and reach a wider audience of potential fans and music professionals. ",
    emoji: <ArtisteLogo3 />,
  },
  {
    id: "music-pro",
    label: "Music Pros",
    description:
      "Anonymously give feedbacks, run campaigns, and discover talent.",
    emoji: <ArtisteLogo3 />,
  },
];
interface Props {
  step: number;
  total: number;
}
export default function ProfileTypeScreen( { step = 1, total = 5 }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const progress = (step / total) * 100;
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      {/* <ProgressHeader step={1} total={5} /> */}
      <View className="w-full h-1  bg-neutral-800 rounded-full">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-white rounded-full"
        />
      </View>
      <View className="flex-1 py-20">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">
            Select profile
          </Text>
          <Text className="text-boarderColor mb-4">
            Select a persona that suits you.
          </Text>
        </View>

        <View className="space-y-4 mb-10 py-6 gap-3">
          {profileTypes.map((item: profilePop) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelected(item.id)}
              className={`flex-row  p-4  gap-4 rounded-3xl ${
                selected === item.id
                  ? "bg-secondary/40"
                  : "border border-[#161616B2]/70"
              }`}
            >
              <Text
                className={`text-2xl mr-3 ${
                  selected === item.id ? "text-black" : "text-white"
                }`}
              >
                {item.emoji}
              </Text>
              <View className="flex-1">
                <Text
                  className={`text-2xl font-bold ${
                    selected === item.id ? "text-white" : "text-white"
                  }`}
                >
                  {item.label}
                </Text>
                <Text
                  className={`text-base mt-2  ${
                    selected === item.id ? "text-white" : "text-white"
                  }`}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => {
              if (selected === "listener") {
                router.push("./Username");
              } else if (selected === "artiste") {
                router.push("./ArtistName");
              } else if (selected === "music-pro") {
                router.push("./MusicProUniqueName");
              }
            }}
            disabled={!selected}
            className={`py-4 rounded-xl px-12 items-center ${selected ? "bg-white" : ""}`}
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
