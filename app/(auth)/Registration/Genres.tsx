import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";

const genres = [
  { id: "hiphop", name: "Hip-Hop", image: require("@/assets/images/genres1.png"), },
  { id: "afrobeat", name: "Afrobeat", image: require("@/assets/images/genres1.png"), },
  { id: "rnb", name: "R&B", image: require("@/assets/images/genres1.png") },
  { id: "pop", name: "Pop", image: require("@/assets/images/genres1.png") },
  { id: "rock", name: "Rock", image: require("@/assets/images/genres1.png"), },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function GenresScreen() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();

  const toggleGenre = (id: string) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ProgressHeader step={12} total={14} />
      <View className="flex-1 px-6">
        <Text className="text-white text-2xl font-semibold mt-10 mb-4">
          Pick your favorite genres
        </Text>

        <FlatList
          data={genres}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const selected = selectedGenres.includes(item.id);
            return (
              <TouchableOpacity
                onPress={() => toggleGenre(item.id)}
                style={{
                  width: CARD_WIDTH,
                }}
                className={`rounded-2xl mb-4 overflow-hidden ${
                  selected ? "border-2 border-white" : "border border-gray-700"
                }`}
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  className="h-32 w-full"
                />
                <View className="bg-black/80 py-2 px-3">
                  <Text
                    className={`text-base ${
                      selected ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          onPress={() => router.push("./ProfilePicture")}
          disabled={selectedGenres.length === 0}
          className={`py-3 rounded-xl ${
            selectedGenres.length > 0 ? "bg-white" : "bg-gray-600"
          }`}
        >
          <Text className="text-center text-black font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
