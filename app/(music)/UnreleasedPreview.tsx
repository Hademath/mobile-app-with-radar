import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import unrealeasedMucStore from "@/store/unrealeased-music-store";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import * as MusicEndpoints from "@/endpoints/musicEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";

export default function UnreleasedPreview() {
  const router = useRouter();
  const { data, updateData } = unrealeasedMucStore();

  // Initialize from store
  const [uploadingAs, setUploadingAs] = useState(data.upload_as || "Artiste");
  const [genre, setGenre] = useState(data.genre || "");
  const [songTitle, setSongTitle] = useState(data.title || "");

  const { data: genresResponse } = useEndpointQuery({
    queryFn: AuthEndpoints.getGenres,
    queryKey: ["fetch genre"],
  });

   const { isPending, mutate } = useDataMutation({
     mutationFn: (payload: any) => MusicEndpoints.uploadUnrealesedSong(payload),
     mutationKey: ["upload unreleased song"],
   });


  // Format genres for picker
  const genreItems = useMemo(() => {
    if (!genresResponse?.data?.data || !Array.isArray(genresResponse.data.data)) {
      return [];
    }
    return genresResponse.data.data.map((g: any) => ({
      label: g.genres_name,
      value: g.uuid,
    }));
  }, [genresResponse]);

  // Get selected genre details using uuid
  const selectedGenreData = useMemo(() => {
    if (!genresResponse?.data?.data || !genre) return null;
    return genresResponse.data.data.find((g: any) => g.uuid === genre);
  }, [genresResponse, genre]);

  // Determine image source
  const genreImageSource = useMemo(() => {
    if (data.genreImage) {
      return { uri: data.genreImage };
    }
    if (selectedGenreData?.representive_picture) {
      return { uri: selectedGenreData.representive_picture };
    }
    return require("@/assets/images/content/rema1.jpg");
  }, [data.genreImage, selectedGenreData]);

  // Update store when values change
  useEffect(() => {
    const selectedGenre = genresResponse?.data?.data?.find(
      (g: any) => g.uuid === genre
    );

    updateData({
      upload_as: uploadingAs,
      genre: genre,
      title: songTitle,
      genreImage: selectedGenre?.representive_picture || data.genreImage,
      genreName: selectedGenre?.genres_name || genre,
    });
  }, [uploadingAs, genre, songTitle, genresResponse, updateData, data.genreImage]);

  const handleContinue = () => {
    // Final validation
    if (!songTitle || !genre || !uploadingAs || !data.song) {
      alert("Please fill in all required fields");
      return; 
    }

    /// Call Api to submit unrealeased song 
    const payload = {
     ...data
    };
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅ uuuuuuuuuuuuuuuuu", payload);    
    
    mutate(payload, {
      onSuccess: async (res) => {
        alert(res?.data.message || "Song uploaded successfully!");
        router.push("/CampaignSetup");
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || err.message || "Failed to upload song. Please try again.";
        alert(msg);
      },
    });


    // Navigate to campaign setup

  };

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue}>
          <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <Text className="text-white font-bold text-3xl mb-2">Upload Music</Text>
      <Text className="text-tertiary mb-6">To proceed, confirm the file.</Text>

      {/* Editable Form Container */}
      <View className="bg-accent rounded-3xl p-5 gap-5">
        {/* Uploading as */}
        <Text className="text-inputLabelCol">Uploading as</Text>
        <View className="rounded-2xl overflow-hidden">
          <RNPickerSelect
            value={uploadingAs}
            onValueChange={setUploadingAs}
            placeholder={{}}
            items={[
              { label: "Artiste", value: "Artiste" },
              { label: "Producer", value: "Producer" },
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
              },
            }}
          />
        </View>

        {/* Song Title */}
        <Text className="text-inputLabelCol">Song Title</Text>
        <TextInput
          value={songTitle}
          onChangeText={setSongTitle}
          placeholder="CVABank"
          placeholderTextColor="#666767"
          className="bg-[#181819] rounded-xl text-white px-4 py-4"
        />

        {/* Genre */}
        <Text className="text-inputLabelCol">Genre</Text>
        <View className="rounded-2xl overflow-hidden">
          <RNPickerSelect
            value={genre}
            onValueChange={setGenre}
            placeholder={{ label: "Change genre", value: "" }}
            items={genreItems}
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
              },
              iconContainer: {
                top: 14,
                right: 10,
              },
            }}
            Icon={() => {
              return <Ionicons name="chevron-down" size={20} color="#666767" />;
            }}
          />
        </View>
      </View>

      {/* Upload Preview */}
      <View className="rounded-3xl mt-6">
        <Text className="text-white font-semibold mb-3">Upload Preview</Text>
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
              {data.genreName || selectedGenreData?.genres_name || "Genre"}
            </Text>
          </View>
          <Text className="text-2xl text-white font-bold">
            {songTitle || "Untitled"}
          </Text>
          <Text className="text-sm text-tertiary mt-2">
            {uploadingAs} • {data.genreName || selectedGenreData?.genres_name} • {new Date().getFullYear()}
          </Text>
        </View>
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}
