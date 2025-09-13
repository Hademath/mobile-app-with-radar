import { View, Text, TouchableOpacity, FlatList, Dimensions, } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import { useAuth } from "@/providers/AuthContext";
import images from "@/constants/images";

const genres = [
  { id: "1", name: "Afrobeat", Icon: images.Afrobeat },
  { id: "2", name: "Hip-Hop", Icon: images.HipHop },
  { id: "3", name: "R&B", Icon: images.RandB },
  { id: "4", name: "Kpop", Icon: images.HipHop },
  { id: "5", name: "Alternative", Icon: images.RandB },
  { id: "6", name: "Amapiano", Icon: images.Afrobeat },
  { id: "7", name: "Classical", Icon: images.RandB },
  { id: "8", name: "Latin", Icon: images.Afrobeat },
  { id: "9", name: "Pop", Icon: images.HipHop },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 3;

export default function GenresScreen() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();

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
  const { user } = useAuth();
  console.log("Current User in Genres Screen:", user);
  
  const API = new AuthEndpoints();
  const { data } = useEndpointQuery({
    queryFn: API.getGenres,
    queryKey: ["fetch genres"],
  });


  
  return (
    <SafeAreaView className="flex-1 bg-black px-6">
      <ProgressHeader step={3} total={5} type={"onboardingBar"} />
      <View className="flex-1 py-10 pb-2">
        <Text className="text-white text-3xl font-bold mb-4 font-clash uppercase">
          Pick 5 genres you Love
        </Text>

        <FlatList
          data={genres || []}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const selected = selectedGenres.includes(item.id);
            const disabled = selectedGenres.length >= 5 && !selected; // disable if max reached & not already selected
            const GenreIcon = item.Icon;

            return (
              <View style={{ width: CARD_WIDTH }} className="mb-4">
                <TouchableOpacity
                  onPress={() => {
                    if (!disabled) toggleGenre(item.id);
                  }}
                  disabled={disabled}
                  className={`
                    aspect-square rounded-full overflow-hidden justify-center items-center 
                    ${
                      selected
                        ? "border-2 border-white"
                        : "border border-gray-700"
                    } 
                    ${disabled ? "opacity-40" : ""}
                  `}
                >
                  <GenreIcon
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </TouchableOpacity>
                <View className="py-2 items-center">
                  <Text
                    className={`text-sm font-medium ${
                      selected ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.name}
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
            onPress={() => router.push("./ProfilePicture")}
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
