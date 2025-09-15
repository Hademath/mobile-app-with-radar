import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, Alert, } from "react-native";
import { useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";
import ProfileSelect from "@/assets/images/ProviileSelect";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import useProfileSetupStore from "@/store/profilesetup-store";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 4;

export default function ProfilePictureScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const router = useRouter();
  const { updateData } = useProfileSetupStore();

  const API = new AuthEndpoints();
  const { data } = useEndpointQuery({
    queryFn: API.getAvatars,
    queryKey: ["fetch avatars"],
  });

  const avatars = useMemo(() => data?.data?.data || [], [data]); 
  useEffect(() => {
  }, [avatars]); 


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setSelectedAvatar(null);
    }
  };

  const handleNext = async () => {
    if (selectedImage) {
      updateData({
        profile: {
          uri: selectedImage,
          name: "profile.jpg",
          type: "image/jpeg",
        },
        avatarType: "upload",
      });
    } else if (selectedAvatar) {
      const avatarUrl = avatars.find( (a: any) => a.uuid === selectedAvatar )?.url;
      updateData({
        profile: avatarUrl,
        avatarType: "avatar",
      });
    }

    router.push("./notificationsEnabled");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <ProgressHeader step={13} total={14} type={"onboardingBar"} />

      <View className="flex-1 py-6">
        {/* Title */}
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
            className="w-[200px] h-[200px] rounded-full"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-full rounded-full"
              />
            ) : selectedAvatar ? (
              <Image
                source={{
                  uri: avatars.find((a: any) => a.uuid === selectedAvatar) ?.url,
                }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <ProfileSelect />
            )}
          </TouchableOpacity>
        </View>

        {/* Avatar section */}
        <Text className="text-white text-xl text-center mb-2">
          Or choose a Talent avatar
        </Text>

        <FlatList
          data={avatars}
          keyExtractor={(item) => item.uuid}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const isSelected = selectedAvatar === item.uuid;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedAvatar(item.uuid);
                  setSelectedImage(null);
                }}
                style={{
                  width: CARD_WIDTH,
                  aspectRatio: 1,
                  marginBottom: 16,
                  borderRadius: CARD_WIDTH / 2,
                  borderWidth: 2,
                  borderColor: isSelected ? "#fff" : "transparent",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Continue */}
        <View className="items-center">
          <TouchableOpacity
            onPress={handleNext}
            disabled={!selectedAvatar && !selectedImage}
            className={`py-4 px-20 rounded-xl ${
              selectedAvatar || selectedImage ? "bg-white" : "bg-gray-600"
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
