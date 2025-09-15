import { View, Text, TouchableOpacity, FlatList, Dimensions,Image } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";
// import { useAuth } from "@/providers/AuthContext";
import useProfileSetupStore from "@/store/profilesetup-store";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 3;

export default function GenresScreen() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();

  const { data: profileData , updateData } = useProfileSetupStore();
  
  const toggleGenre = (uuid: string) => {
    setSelectedGenres((prev) => {
      const alreadySelected = prev.includes(uuid);
      if (alreadySelected) {
        return prev.filter((item) => item !== uuid);
      } else {
        if (prev.length >= 5) return prev;
        return [...prev, uuid];
      }
    });
  };

  // const { user } = useAuth();
 const role = profileData?.role;
  
  const API = new AuthEndpoints();
  const { data } = useEndpointQuery({
    queryFn: API.getGenres,
    queryKey: ["fetch genres"],
  });

  // const genres = data?.data?.data || [];
  const genres = useMemo(() => data?.data?.data || [], [data]);
  
    const handleNext = () => {
      if (selectedGenres.length < 5) {
        alert("Please select 5 genres");
        return;
      }
      updateData({ genres: selectedGenres });
      if (role === "artiste") {
        router.push("./ArtisteProfilePicture");
      } else {
        router.push("./ProfilePicture");
      }
      
    };
  
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <ProgressHeader step={3} total={5} type={"onboardingBar"} />
      <View className="flex-1 py-10 pb-2">
        <Text className="text-white text-3xl font-bold mb-4 font-clash uppercase">
          Pick 5 genres you Love
        </Text>

        <FlatList
          data={genres}
          keyExtractor={(item) => item.uuid}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const selected = selectedGenres.includes(item.uuid);
            const disabled = selectedGenres.length >= 5 && !selected;

            return (
              <View style={{ width: CARD_WIDTH }} className="mb-4">
                <TouchableOpacity
                  onPress={() => {
                    if (!disabled) toggleGenre(item.uuid);
                  }}
                  disabled={disabled}
                  className={`
            aspect-square rounded-full overflow-hidden justify-center items-center 
            ${selected ? "border-2 border-white" : "border border-gray-700"} 
            ${disabled ? "opacity-40" : ""}
          `}
                >
                  <Image
                    source={{ uri: item.representive_picture }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View className="py-2 items-center">
                  <Text
                    className={`text-sm font-medium ${
                      selected ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.genres_name}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* <TouchableOpacity
          onPress={() => router.push("./ProfilePicture")}
          disabled={selectedGenres.length === 0}
          className={`py-3 rounded-xl ${
            selectedGenres.length > 0 ? "bg-white" : "bg-gray-600"
          }`}
        >
          <Text className="text-center text-black font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity> */}
        <View className="items-center">
          <TouchableOpacity
            onPress={handleNext}
            disabled={selectedGenres.length < 5}
            className="bg-white py-4 px-12 rounded-xl items-center"
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
