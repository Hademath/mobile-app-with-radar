import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useMemo, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import musicStore from "@/store/unrealeased-music-store";
import campaignStore from "@/store/campaign-store";
import useDataMutation from "@/hooks/useEndpointMutation";
import * as MusicEndpoints from "@/endpoints/musicEndpoints";
import { releasedMusicSchema } from "@/schemas/uploadMusicSchema";

export default function ReleasedPreview() {
  const router = useRouter();
  const { data, updateData } = musicStore();
  const { updateData: campaignData } = campaignStore();

  console.log("Released Music Store Data:", data);

  const [songLink, setSongLink] = useState("");
  const [hasLinkChanged, setHasLinkChanged] = useState(false);

  // Initialize songLink with stored streamUrl
  useEffect(() => {
    if (data.metaData?.streamUrl) {
      setSongLink(data.metaData.streamUrl);
    }
  }, [data.metaData?.streamUrl]);

  // Extract link mutation (for when link changes)
  const { isPending: isExtracting, mutate: extractMutate } = useDataMutation({
    mutationFn: (payload: any) => MusicEndpoints.extractLink(payload),
    mutationKey: ["extract music link preview"],
  });

  // Upload released music mutation
  const { isPending: isUploading, mutate: uploadMutate } = useDataMutation({
    mutationFn: (payload: any) => MusicEndpoints.uploadReleasedMusic(payload),
    mutationKey: ["upload released song"],
  });

  // Check if link has changed
  useEffect(() => {
    if (
      songLink &&
      data.metaData?.streamUrl &&
      songLink !== data.metaData.streamUrl
    ) {
      setHasLinkChanged(true);
    } else {
      setHasLinkChanged(false);
    }
  }, [songLink, data.metaData?.streamUrl]);

  // Handle re-extraction when link changes
  const handleExtractNewLink = () => {
    const validationData = {
      songUrl: songLink,
      externalPlatform: data.externalPlatform,
    };

    const parsed = releasedMusicSchema.safeParse(validationData);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    const payload = {
      songUrl: songLink,
      externalPlatform: data.externalPlatform,
      musicType: data.musicType || "Released",
    };

    extractMutate(payload, {
      onSuccess: (res) => {
        const extractedData = res?.data?.data;
        console.log("✅ New link extraction successful:", extractedData);

        updateData({
          song: extractedData.streamUrl,
          genreImage: extractedData.artworkUrl,
          title: extractedData.title,
          genre: extractedData.genre || "",
          metaData: extractedData,
        });

        setHasLinkChanged(false);
        alert("Link updated successfully!");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Song Extraction failed";
        alert(msg);
      },
    });
  };

  // Handle final upload and continue
  const handleContinue = () => {
    if (hasLinkChanged) {
      alert("Please update the link first by clicking the arrow button");
      return;
    }

    const uploadPayload = {
      musicType: "released", 
      externalPlatform: data.externalPlatform,
      songUrl: data.metaData?.streamUrl,
    };

    uploadMutate(uploadPayload, {
      onSuccess: (response) => {
        console.log("✅ Song uploaded successfully:", response.data.data);
       alert("✅ Song uploaded successfully:");

        // Update campaign store with music metadata
        campaignData({
          musicMetadata: response.data.data,
          music: data,
        });

        // Navigate to campaign setup
        router.push("/CampaignSetup");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || "Upload failed";
        alert(msg);
      },
    });
  };

  // Determine image source
  const genreImageSource = useMemo(() => {
    if (data.genreImage) {
      return { uri: data.genreImage };
    }
    return require("@/assets/images/content/rema1.jpg");
  }, [data.genreImage]);

  const artistName = useMemo(() => {
    if (data.metaData?.artistName) {
      return data.metaData.artistName;
    } else if (data.metaData?.channelName) {
      return data.metaData.channelName;
    }
    return "Unknown Artist";
  }, [data.metaData?.artistName, data.metaData?.channelName]);

  const releaseDate = data.metaData?.releaseDate;
  const year = releaseDate
    ? new Date(releaseDate).getFullYear()
    : new Date().getFullYear();

  const isProcessing = isExtracting || isUploading;

  return (
    <View className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
          disabled={isProcessing}
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          disabled={isProcessing || hasLinkChanged}
        >
          <Text
            className={`font-semibold text-lg ${
              isProcessing || hasLinkChanged ? "text-gray-500" : "text-teal-400"
            }`}
          >
            {isUploading ? "Uploading..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <Text className="text-white font-extrabold text-4xl mb-2">
        Preview & Confirm
      </Text>
      <Text className="text-tertiary mb-12 text-lg">
        Review the music details or update the link
      </Text>

      {/* Form Container */}
      <View className="flex-row justify-between rounded-3xl gap-5">
        <TextInput
          value={songLink}
          onChangeText={setSongLink}
          placeholder="Paste music link"
          placeholderTextColor="#666767"
          className="bg-[#181819] w-full rounded-xl text-white px-4 py-6"
          editable={!isProcessing}
        />
        <TouchableOpacity
          className={`absolute right-0 py-5 px-4 rounded-xl ${
            hasLinkChanged && !isExtracting ? "bg-secondary" : "bg-gray-500"
          }`}
          onPress={handleExtractNewLink}
          disabled={!hasLinkChanged || isProcessing}
        >
          {isExtracting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ArrowRight color={hasLinkChanged ? "#000" : "#666"} />
          )}
        </TouchableOpacity>
      </View>

      {hasLinkChanged && (
        <Text className="text-yellow-500 text-xs mt-2">
          Link has changed. Click arrow to update →
        </Text>
      )}

      {/* Link Preview */}
      <View className="rounded-3xl mt-6">
        <Text className="text-white font-semibold mb-3">Link Preview</Text>
        <View className="bg-accent rounded-3xl overflow-hidden">
          <Image
            className="w-full h-56"
            resizeMode="cover"
            source={genreImageSource}
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
              {data.genre || "Genre"}
            </Text>
          </View>
          <Text className="text-2xl text-white font-bold">{data.title}</Text>
          <Text className="text-sm text-tertiary mt-2">
            EP • {artistName} • 5 songs • {year}
          </Text>
        </View>
      </View>

      {isUploading && (
        <View className="mt-6 bg-blue-900/50 rounded-xl p-4">
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#60A5FA" />
            <Text className="text-blue-300 text-sm ml-3">
              Uploading song...
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
