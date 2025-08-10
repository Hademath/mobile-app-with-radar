import { View, Text, TouchableOpacity, TextInput, } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function Unreleased() {
  const router = useRouter();
  const [uploadingAs, setUploadingAs] = useState("Artiste");
  const [genre, setGenre] = useState("Afrobeat");
  const [songTitle, setSongTitle] = useState("");
  const [file, setFile] = useState<any>(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/*", "application/zip", "application/x-rar-compressed"],
        copyToCacheDirectory: true,
      });

      if (result) {
        setFile(result);
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
        <TouchableOpacity onPress={() => router.push("/UnreleasedPreview")}>
          <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-full border-b border-accent mb-8"></View>
      {/* Title */}
      <Text className="text-white font-bold  text-3xl mb-2">Upload Music</Text>
      <Text className="text-tertiary mb-6">To proceed, upload the file.</Text>

      {/* Form Container */}
      <View className="bg-accent rounded-3xl p-4 gap-5">
        {/* Uploading as */}
        <Text className="text-inputLabelCol ">Uploading as</Text>
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
        <Text className="text-inputLabelCol ">Song Title</Text>
        <TextInput
          value={songTitle}
          onChangeText={setSongTitle}
          placeholder="CVABank"
          placeholderTextColor="#666767"
          className="bg-[#181819] rounded-xl text-white px-4 py-4 "
        />

        {/* Genre */}
        <Text className="text-inputLabelCol ">Genre</Text>
        <View className="rounded-2xl overflow-hidden ">
          <RNPickerSelect
            value={genre}
            onValueChange={setGenre}
            placeholder={{}}
            items={[
              { label: "Afrobeat", value: "Afrobeat" },
              { label: "Hip-Hop", value: "Hip-Hop" },
              { label: "Pop", value: "Pop" },
              { label: "Reggae", value: "Reggae" },
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
            {/* <Ionicons name="cloud-upload-outline" size={28} color="#00BFA5" /> */}
          </View>
          <Text className="text-white font-bold text-lg">
            {file ? file.name : "Browse to upload music"}
          </Text>
          <Text className="text-[#666767] text-sm mt-1">
            Support zip and rar files
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
