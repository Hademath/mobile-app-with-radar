import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,

} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";
import ProfileSelect from "@/assets/images/ProviileSelect"; // Make sure this name is correct!


export default function ArtisteProfilePicture() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setSelectedAvatar(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <ProgressHeader step={13} total={14} type={"onboardingBar"} />
      <View className="flex-1 justify-between py-6">
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold uppercase mb-2">
            Choose a profile picture
          </Text>
          <Text className="text-boarderColor">
            Choose a photo that represents you!
          </Text>
        </View>

        {/* Profile preview */}
        <View className="items-center mb-10">
          <TouchableOpacity
            onPress={pickImage}
            className="w-[200px] h-[201px] rounded-full "
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <ProfileSelect />
            )}
          </TouchableOpacity>
        </View>


        {/* Continue */}
        <View className="items-center">
          <TouchableOpacity
            onPress={() => router.push("./notificationsEnabled")}
            disabled={!selectedAvatar && !selectedImage}
            className={`py-4 px-20  rounded-xl ${
              selectedAvatar || selectedImage ? "bg-white" : "bg-white"
            }`}
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
