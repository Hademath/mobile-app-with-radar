import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import campaignStore from "@/store/campaign-store";

export default function SelectFixedPrompt() {
  const router = useRouter();

    const { data } = campaignStore();
  // console.log("Campaign ID:", data.campaign);
  // Tab data
  const tabs = [
    { id: "all", title: "All" },
    { id: "artiste", title: "Artiste" },
    { id: "music-pro", title: "Music Pro’s" },
  ];

  // Prompt data
  const promptData = [
    {
      id: 1,
      category: "artiste",
      question: "What is your preferred genre?",
      type: "Multiple Choice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: 2,
      category: "music-pro",
      question: "What is your preferred genre?",
      type: "Checkbox",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      id: 3,
      category: "artiste",
      question: "Which instrument do you play?",
      type: "Multiple Choice",
      options: ["Guitar", "Piano", "Drums", "Violin"],
    },
  ];

  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);

  const filteredPrompts =
    selectedTab === "all"
      ? promptData
      : promptData.filter((p) => p.category === selectedTab);

  const togglePromptSelection = (id: number) => {
    setSelectedPrompts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/PreviewCampaign")}>
          <Text className="text-secondary font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-white font-bold text-3xl mb-2">Select Prompts</Text>
      <Text className="text-gray-400 mb-6">
        {" "}
        Select from our default prompts.{" "}
      </Text>

      {/* Tabs */}
      <View className="flex-row gap-3 mb-6">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab.id ? "bg-secondary" : "bg-accent"
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedTab === tab.id ? "text-black" : "text-white"
              }`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Prompt Cards */}
      {filteredPrompts.map((prompt) => {
        const isSelected = selectedPrompts.includes(prompt.id);
        return (
          <TouchableOpacity
            key={prompt.id}
            onPress={() => togglePromptSelection(prompt.id)}
            className={`rounded-2xl p-5 mb-6 ${
              isSelected
                ? "bg-secondary/20 border border-secondary"
                : "bg-neutral-900"
            }`}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-bold text-lg">
                {prompt.question}
              </Text>
              <TouchableOpacity
                className={`px-3 py-1 rounded-lg ${
                  isSelected ? "bg-secondary" : "bg-accent"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    isSelected ? "text-black" : "text-white"
                  }`}
                >
                  {isSelected ? "Selected" : "Select"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Type */}
            <Text className="text-gray-400 mb-3">{prompt.type}</Text>

            {/* Options */}
            {prompt.options.map((opt, idx) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-5 h-5 rounded border border-gray-400 mr-3" />
                <Text className="text-white">{opt}</Text>
              </View>
            ))}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
