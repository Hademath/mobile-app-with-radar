import { View, Text, TouchableOpacity, TextInput,ScrollView, Image} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function UnreleasedPreview() {
  const router = useRouter();
  const [uploadingAs, setUploadingAs] = useState("Artiste");
  const [genre, setGenre] = useState("Afrobeat");
  const [songTitle, setSongTitle] = useState("");


  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12 ">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/CampaignSetup")}>
          <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-full border-b border-accent mb-8"></View>
      {/* Title */}
      <Text className="text-white font-bold  text-3xl mb-2">Upload Music</Text>
      <Text className="text-tertiary mb-6">To proceed, upload the file.</Text>

      {/* Form Container */}
      <View className="bg-accent rounded-3xl p-5 gap-5">
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
          className="bg-[#181819] rounded-xl text-inputLabelCol px-4 py-4 "
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
            Icon={() => {
              return <Ionicons name="chevron-down" size={20} color="#666767" />;
            }}
          />
        </View>
      </View>

      {/* Upload Box */}

      <View className=" rounded-3xl mt-6">
        <Text className="text-white font-semibold mb-3"> Upload Preview </Text>
        <View className="bg-accent rounded-3xl overflow-hidden">
          <Image
            className="w-full h-56"
            resizeMode="cover"
            source={require("@/assets/images/content/rema1.jpg")}
          />
          <View className="absolute top-3 right-2 mr-3 bg-black/40 p-2 rounded-full">
            <Ionicons name="volume-medium" size={16} color="white" />
          </View>
        </View>

        {/* details  */}
        <View className="mt-4 rounded-3xl bg-accent  p-6">
          <View className="flex-row items-center gap-2 space-x-2 mb-2">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-xs text-gray-400 font-semibold">Genre</Text>
          </View>
          <Text className="text-2xl text-white font-bold">Ravage</Text>
          <Text className="text-sm text-tertiary mt-2">
            {" "}
            EP • Rema • 5 songs • 2023{" "}
          </Text>
        </View>
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
}
