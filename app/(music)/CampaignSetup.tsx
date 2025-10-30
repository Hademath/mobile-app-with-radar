import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import campaignStore from "@/store/campaign-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import * as CampaignEndpoints from "@/endpoints/campaignEndpoints";

export default function CampaignSetup() {
  const router = useRouter();
  const [audienceType, setAudienceType] = useState("listeners");

  const { data, updateData } = campaignStore();
  console.log("✅✅✅✅✅ DATAAAA:", data);
  // Age Range State
  const [lowAge, setLowAge] = useState(18);
  const [highAge, setHighAge] = useState(30);
  const [duration, setDuration] = useState(6);
  const [estimatedReach, setEstimatedReach] = useState({ min: 640, max: 1700 });

  // Calculate estimated reach based on age range and duration
  const calculateEstimatedReach = (low: number, high: number, days: number) => {
    const ageGap = high - low;
    
    // Base calculation: each year of age range = 100 potential users per day
    // This creates a realistic scaling based on audience size and campaign duration
    const baseReach = ageGap * days * 100;
    
    // Create a range (min to max) with variance
    // Min is 70% of base, max is 130% of base
    let min = Math.floor(baseReach * 0.7);
    let max = Math.floor(baseReach * 1.3);
    
    // Apply constraints
    min = Math.max(10, Math.min(min, 100000));
    max = Math.max(min + 100, Math.min(max, 100000));
    
    // Ensure max is always greater than min
    if (max <= min) {
      max = Math.min(min + 500, 100000);
    }
    
    return { min, max };
  };

  // Recalculate estimated reach whenever age range or duration changes
  useEffect(() => {
    const reach = calculateEstimatedReach(lowAge, highAge, duration);
    setEstimatedReach(reach);
  }, [lowAge, highAge, duration]);

  // Mutation to create campaign
  const { isPending, mutate } = useDataMutation({
    mutationFn: (payload: any) => 
      CampaignEndpoints.createCampaign(payload.songId, payload.data),
    mutationKey: ["create campaign"],
  });

  const handleSubmit = () => {
    const campaignPayload = {
      songId: data.musicMetadata?.uuid,
      data: {
        targetAudience: audienceType,
        ageGroup: `${lowAge}-${highAge}`,
        duration: duration,
        estimated_reach: estimatedReach,
      },
    };
    mutate(campaignPayload, {
      onSuccess: (res) => {
        updateData({
          uuid: res?.data?.data?.uuid,
          targetAudience: audienceType,
          ageGroup: `${lowAge}-${highAge}`,
          duration: duration,
          estimated_reach: estimatedReach, // Use calculated reach
        });

        alert("Campaign created successfully!");
        router.push("/SelectPromptTypes");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Failed to create campaign";
        alert(msg);
      },
    });
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          disabled={isPending}
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} disabled={isPending}>
          {isPending ? (
            <ActivityIndicator size="small" color="#00BFA5" />
          ) : (
            <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
          )}
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8" />

      {/* Title */}
      <Text className="text-white font-bold text-3xl mb-2">Campaign Setup</Text>
      <Text className="text-tertiary mb-6">
        What kind of campaign do you want to run?
      </Text>

      {/* Select audience type */}
      <Text className="text-white font-semibold mb-3">Select audience type</Text>
      <View className="gap-4 mb-8">
        {/* Listeners Option */}
        <TouchableOpacity
          className="flex-row items-center bg-accent rounded-xl px-4 py-4"
          onPress={() => setAudienceType("listeners")}
          disabled={isPending}
        >
          <Ionicons
            name={audienceType === "listeners" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="#2dd4bf"
          />
          <Text className="text-white ml-3 text-base">Listeners</Text>
        </TouchableOpacity>

        {/* Locked Option */}
        <View className="flex-row items-center bg-accent rounded-xl px-4 py-4 opacity-50">
          <Ionicons name="radio-button-off" size={24} color="#666" />
          <Text className="text-white ml-3 flex-1 text-base">
            Listeners & Music Pro&apos;s
          </Text>
          <Ionicons name="lock-closed" size={20} color="#2dd4bf" />
        </View>
      </View>

      {/* Set Age - Dual Range Slider */}
      <View className="mt-4 mb-8">
        <Text className="text-white font-semibold text-xl mb-4">Set Age</Text>
        
        {/* Age Value Indicators */}
        <View className="flex-row justify-between mb-4 px-2">
          <View className="bg-accent px-5 py-2 rounded-lg">
            <Text className="text-white text-lg font-semibold">{lowAge}</Text>
          </View>
          <View className="bg-accent px-5 py-2 rounded-lg">
            <Text className="text-white text-lg font-semibold">{highAge}</Text>
          </View>
        </View>

        {/* Dual Slider Container */}
        <View className="relative">
          {/* Lower Age Slider */}
          <Slider
            
            style={{ width: "100%", position: "absolute",  }}
            minimumValue={18}
            maximumValue={highAge - 1}
            step={1}
            value={lowAge}
            minimumTrackTintColor="#2dd4bf"
            maximumTrackTintColor="transparent"
            thumbTintColor="#2dd4bf"
            onValueChange={(val) => setLowAge(Math.floor(val))}
          />
          
          {/* Upper Age Slider */}
          <Slider
            style={{ width: "100%", position: "absolute" }}
            minimumValue={lowAge + 1}
            maximumValue={65}
            step={1}
            value={highAge}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="#555"
            thumbTintColor="#2dd4bf"
            onValueChange={(val) => setHighAge(Math.floor(val))}
          />
        </View>
      </View>

      {/* Set Duration */}
      <View className="mt-4 mb-8">
        <Text className="text-white font-semibold text-xl mb-4">Set duration</Text>
        
        {/* Duration Value Indicator */}
        <View className="items-center mb-4">
          <View className="bg-accent px-6 py-2 rounded-lg">
            <Text className="text-white text-lg font-semibold">{duration} days</Text>
          </View>
        </View>

        {/* Duration Slider */}
        <Slider
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={duration}
          minimumTrackTintColor="#2dd4bf"
          maximumTrackTintColor="#555"
          thumbTintColor="#2dd4bf"
          onValueChange={(val) => setDuration(Math.floor(val))}
        />
      </View>

      {/* Estimated Reach - Dynamic */}
      <View className="items-center mt-8 mb-12">
        <Text className="text-teal-400 text-base mb-2">Estimated Reach</Text>
        <Text className="text-white text-4xl font-bold">
          {formatNumber(estimatedReach.min)} - {formatNumber(estimatedReach.max)}
        </Text>
      </View>

      {/* Loading Indicator */}
      {isPending && (
        <View className="mt-6 mb-6 items-center">
          <ActivityIndicator size="large" color="#00BFA5" />
          <Text className="text-white mt-3 text-base">Creating campaign...</Text>
        </View>
      )}

      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}
