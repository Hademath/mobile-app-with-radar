import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ArtisteLogo3 from "../../assets/images/svgs/ArtisteLogo3";
import { ArrowLeft } from "lucide-react-native";
import musicStore from "@/store/unrealeased-music-store";
interface profilePop {
  id: string;
  label: string;
  description: string;
  emoji: React.ReactNode;
}

const musicTypes = [
  {
    id: "unreleased",
    label: "Unreleased Music",
    description:
      "Upload a new music project and gain useful insights from an audience.",
    emoji: <ArtisteLogo3 />,
  },
  {
    id: "released",
    label: "Released Music",
    description:
      "Share your music link to an audience to gather relevant feedback.",
    emoji: <ArtisteLogo3 />,
  },
];


  

export default function MusicType() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const { updateData, data } = musicStore();
  const handleNext = () => {
 
    updateData({ musicType: selected || "" });

    if (selected === "unreleased") { 
      router.push("./Unreleased");
    } else if (selected === "released") {   
      router.push("./Released");
    }

  }
  
  console.log(data); 
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
      >
        <ArrowLeft size={20} color="black" />
      </TouchableOpacity>
      <View className=" w-full border-b border-accent mt-8"></View>
      <View className="flex-1 py-20">
        <View>
          <Text className="text-white text-3xl font-bold mb-1">
            Select Music Type
          </Text>
          <Text className="text-boarderColor mb-4">
            Run campaigns for unreleased and released music
          </Text>
        </View>

        <View className="space-y-4 mb-10 py-6 gap-3">
          {musicTypes.map((item: profilePop) => (
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
            onPress={handleNext}
            disabled={!selected}
            className={`py-4 rounded-xl px-12 items-center ${
              selected ? "bg-white" : ""
            }`}
          >
            <Text className="text-center text-2xl text-primary font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
