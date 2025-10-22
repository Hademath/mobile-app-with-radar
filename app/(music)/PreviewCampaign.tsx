import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import campaignStore from "@/store/campaign-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import * as CampaignEndpoints from "@/endpoints/campaignEndpoints";

export default function PreviewCampaign() {
  const router = useRouter();
  const { data } = campaignStore();

  const { isPending, mutate } = useDataMutation({
    mutationFn: ({ campaignId, prompts }: any) =>
      CampaignEndpoints.addPrompt(campaignId, prompts),
    mutationKey: ["add prompts to campaign"],
  });

  const handleRunCampaign = () => {
    // Validate required data
    if (!data?.uuid) {
      alert("Campaign not found. Please go back and create campaign.");
      return;
    }

    if (!data.prompts || data.prompts.length === 0) {
      alert("Please add at least one prompt before running campaign.");
      return;
    }

    const payload = {
      campaignId: data.uuid,
      prompts: data.prompts,
    };

    console.log("Adding prompts to campaign:", payload);

    mutate(payload, {
      onSuccess: (res) => {
        console.log("✅ Prompts added successfully:", res?.data);
        alert("Campaign started successfully!");
        router.push("/Success");
      },
      onError: (err: any) => {
        console.error("❌ Failed to add prompts:", err);
        const msg = err?.response?.data?.message || "Failed to start campaign";
        alert(msg);
      },
    });
  };

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
          disabled={isPending}
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-white font-bold text-lg mr-8">Review</Text>
        </View>
        <View>
          <Text className="font-semibold text-lg"></Text>
        </View>
      </View>
      <View className="w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <View className="items-center mb-6">
        <Text className="text-white items-center font-bold text-3xl mb-2">
          All good?
        </Text>
      </View>

      {/* Form Container - Data from Store */}
      <View className="bg-accent rounded-3xl p-5 gap-5">
        <View className="flex-row justify-between">
          <Text className="text-artgray">Audience</Text>
          <Text className="text-artgray capitalize">
            {data.targetAudience || "Listeners"}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-artgray">Music Type</Text>
          <Text className="text-artgray">{data.music?.musicType}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-artgray">Age</Text>
          <Text className="text-artgray">{data.ageGroup || "18-30"}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-artgray">Duration</Text>
          <Text className="text-artgray">{data.duration || 6} days</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-artgray">Estimated Reach</Text>
          <Text className="text-artgray">
            {data.estimated_reach?.min} -{" "}
            {data.estimated_reach?.max}
          </Text>
        </View>
      </View>

      {/* Upload Preview - Data from Store */}
      <View className="rounded-3xl mt-6">
        <Text className="text-white font-semibold mb-3">Upload Preview</Text>
        <View className="bg-accent rounded-3xl overflow-hidden">
          <Image
            className="w-full h-56"
            resizeMode="cover"
            source={
              data.music?.genreImage
                ? { uri: data.music.genreImage }
                : require("@/assets/images/content/rema1.jpg")
            }
          />
          <View className="absolute top-3 right-2 mr-3 bg-black/40 p-2 rounded-full">
            <Ionicons name="volume-medium" size={16} color="white" />
          </View>
        </View>

        {/* Details */}
        <View className="mt-4 rounded-3xl bg-accent p-6">
          <View className="flex-row items-center gap-2 space-x-2 mb-2">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-xs text-gray-400 font-semibold">
              {data.music?.genreName || "Genre"}
            </Text>
          </View>
          <Text className="text-2xl text-white font-bold">
            {data.music?.title || "Untitled"}
          </Text>
          <Text className="text-sm text-tertiary mt-2">
            {data.musicMetadata?.artist || "Artist"} •{" "}
            {new Date().getFullYear()}
          </Text>
        </View>
      </View>

      {/* Run Campaign Button */}
      <View className="flex-1 justify-end items-center mt-6 mb-12">
        <TouchableOpacity
          className="bg-secondary items-center rounded-2xl p-6 text-white"
          onPress={handleRunCampaign}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text className="text-primary font-bold text-lg">Run Campaign</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {isPending && (
        <View className="items-center mb-6">
          <ActivityIndicator size="large" color="#00BFA5" />
          <Text className="text-white mt-2">Starting campaign...</Text>
        </View>
      )}

      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}
