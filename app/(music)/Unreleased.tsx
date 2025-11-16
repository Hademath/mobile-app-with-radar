import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React,{ useState, useMemo } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import musicStore from "@/store/unrealeased-music-store";
import { unrealeasedMusicSchema } from "@/schemas/uploadMusicSchema";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import * as AuthEndpoints from "@/endpoints/authEndpoints";

export default function Unreleased() {
  const router = useRouter();
  const { updateData, data } = musicStore();

  // Initialize from store if data exists
  const [uploadingAs, setUploadingAs] = useState(data.upload_as || "Artiste");
  const [genre, setGenre] = useState(data.genre || "");
  const [songTitle, setSongTitle] = useState(data.title || "");
  const [file, setFile] = useState<any>(null);

  const { data: genresResponse } = useEndpointQuery({
    queryFn: AuthEndpoints.getGenres,
    queryKey: ["fetch genre"],
  });

  // console.log("✅ Genres Response:", genresResponse);

  // Format genres for picker - accessing the correct nested structure
  const genreItems = useMemo(() => {
    // Check if the response has the data array
    if (
      !genresResponse?.data?.data ||
      !Array.isArray(genresResponse.data.data)
    ) {
      return [];
    }

    return genresResponse.data.data.map((g: any) => ({
      label: g.genres_name,
      value: g.uuid,
    }));
  }, [genresResponse]);

  const handleContinue = () => {
    // Prepare validation data
    const validationData = {
      song: file?.uri || data.song || "",
      upload_as: uploadingAs,
      genre: genre,
      title: songTitle,
    };

    // Validate with schema
    const parsed = unrealeasedMusicSchema.safeParse(validationData);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    // Get genre details for image using uuid
    const selectedGenre = genresResponse?.data?.data?.find(
      (g: any) => g.uuid === genre
    );

    // Update store with all data including genre image
    updateData({
      song: file?.uri || data.song || "",
      upload_as: uploadingAs,
      genre: genre,
      title: songTitle,
      genreImage: selectedGenre?.representive_picture || null,
      genreName: selectedGenre?.genres_name || genre,
    });

    // Navigate to preview
    router.push("/UnreleasedPreview");
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/*", "video/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.log("File pick error:", err);
    }
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
        <TouchableOpacity onPress={handleContinue}>
          <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8"></View>

      {/* Title */}
      <Text className="text-white font-bold text-3xl mb-2">Upload Music</Text>
      <Text className="text-tertiary mb-6">To proceed, upload the file.</Text>

      {/* Form Container */}
      <View className="bg-accent rounded-3xl p-4 gap-5">
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
                height: 44,
              },
              iconContainer: {
                top: 14,
                right: 10,
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
            placeholder={{ label: "Select a genre...", value: "" }}
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
                height: 44,
              },
              iconContainer: {
                top: 14,
                right: 10,
              },
            }}
            Icon={() => <Ionicons name="chevron-down" size={20} color="gray" />}
          />
        </View>

        {/* Upload Box */}
        <TouchableOpacity
          className="items-center justify-center py-8 rounded-2xl bg-[#181819]"
          onPress={pickFile}
        >
          <View className="bg-teal-500/20 p-4 rounded-full mb-3">
            <MaterialCommunityIcons
              name="file-upload-outline"
              size={24}
              color="#00BFA5"
            />
          </View>
          <Text className="text-white font-bold text-lg">
            {file?.name ||
              (data.song ? "File selected" : "Browse to upload music")}
          </Text>
          <Text className="text-[#666767] text-sm mt-1">
            Support audio and video files
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
