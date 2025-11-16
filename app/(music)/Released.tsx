import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import RNPickerSelect from "react-native-picker-select";
import musicStore from "@/store/unrealeased-music-store";
import { releasedMusicSchema } from "@/schemas/uploadMusicSchema";
import useDataMutation from "@/hooks/useEndpointMutation";
import * as MusicEndpoints from "@/endpoints/musicEndpoints";

export default function Released() {
  const router = useRouter();
  const { updateData, data } = musicStore();

  const { isPending, mutate } = useDataMutation({
    mutationFn: (payload: any) => MusicEndpoints.extractLink(payload),
    mutationKey: ["extract music link"],
  });

  const [songLink, setSongLink] = useState("");
  const [externalPlatform, setExternalPlatform] = useState("");

  const handleContinue = () => {
    const validationData = {
      songUrl: songLink,
      externalPlatform: externalPlatform,
    };

    const parsed = releasedMusicSchema.safeParse(validationData);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    const payload = {
      songUrl: songLink,
      externalPlatform: externalPlatform,
      musicType: data.musicType || "Released",
    };

    mutate(payload, {
      onSuccess: (res) => {
        const extractedData = res?.data?.data;
        console.log("✅ Link extraction successful:", extractedData);

        updateData({
          song: extractedData.streamUrl,
          upload_as: "Artiste",
          genreImage: extractedData.artworkUrl,
          title: extractedData.title,
          genre: extractedData.genre || "",
          metaData: extractedData,
          externalPlatform: externalPlatform,
        });

        // Navigate to preview screen after successful extraction
        router.push("/ReleasedPreview");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Song Extraction failed";
        alert(msg);
      },
    });
  };

  return (
    <View className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue} disabled={isPending}>
          <Text
            className={`font-semibold text-lg ${
              isPending ? "text-gray-500" : "text-secondary"
            }`}
          >
            {isPending ? "Processing..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <Text className="text-white font-extrabold text-4xl mb-2">
        Link Stream Platform
      </Text>
      <Text className="text-tertiary mb-12 text-lg">
        To proceed, copy and paste the music link
      </Text>

      <View className="bg-accent rounded-3xl p-5 gap-5 mb-6">
        <Text className="text-inputLabelCol">Link From</Text>
        <View className="rounded-2xl overflow-hidden">
          <RNPickerSelect
            value={externalPlatform}
            onValueChange={setExternalPlatform}
            placeholder={{ label: "Select platform...", value: "" }}
            items={[
              { label: "Youtube", value: "youtube" },
              { label: "Spotify", value: "spotify" },
            ]}
            style={{
              inputAndroid: {
                color: "#666767",
                backgroundColor: "#181819",
                paddingHorizontal: 10,
              },
              inputIOS: {
                color: "#666767",
                backgroundColor: "#181819",
                paddingHorizontal: 10,
                height: 44,
              },
              iconContainer: {
                top: 14,
                right: 10,
              },
            }}
          />
        </View>
      </View>

      {/* Form Container */}
      <View className="flex-row justify-between rounded-3xl gap-5">
        <TextInput
          value={songLink}
          onChangeText={setSongLink}
          placeholder="Paste music link"
          placeholderTextColor="#666767"
          className="bg-[#181819] w-full rounded-xl text-white px-4 py-6"
          editable={!isPending}
        />
        <TouchableOpacity
          className={`absolute right-0 py-5 px-4 rounded-xl ${
            isPending ? "bg-gray-500" : "bg-secondary"
          }`}
          onPress={handleContinue}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ArrowRight />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
