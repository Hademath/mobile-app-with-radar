import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ArtisteLogo3 from "../../assets/images/svgs/ArtisteLogo3";
import { ArrowLeft } from "lucide-react-native";
import campaignStore from "@/store/campaign-store";

interface profilePop {
  id: string;
  label: string;
  description: string;
  emoji: React.ReactNode;
}

const SelectPromptTypes = [
  {
    id: "create-prompt",
    label: "Create Prompt",
    description: "Create your questions for an audience to give feedback.",
    emoji: <ArtisteLogo3 />,
  },
  {
    id: "fixed-prompt",
    label: "Fixed Prompt",
    description: "Create your questions for an audience to give feedback.",
    emoji: <ArtisteLogo3 />,
  },
];

export default function SelectPromptType() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { data, updateData } = campaignStore();
console.log("prompt_data_section", data);
    const handleSelectPromptType = (type: "create-prompt" | "fixed-prompt") => {
      if (selected === "create-prompt") {
        updateData({ fixed_prompt: "create-prompt" });
        router.push("./CreatePrompt");
      } else if (selected === "fixed-prompt") {
        updateData({ fixed_prompt: "fixed-prompt" });
        router.push("./SelectFixedPrompt");
      }
    };
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
            Select Prompts
          </Text>
          <Text className="text-boarderColor mb-4">
            You can either create a new prompt or use one of ours.
          </Text>
        </View>

        <View className="space-y-4 mb-10 py-6 gap-3">
          {SelectPromptTypes.map((item: profilePop) => (
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
            onPress={() => handleSelectPromptType(selected as "create-prompt" | "fixed-prompt")}
            disabled={!selected}
            className={`py-4 rounded-xl px-12 items-center ${
              selected ? "bg-white" : ""
            }`}
          >
            <Text className="text-center text-primary text-2xl text font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
