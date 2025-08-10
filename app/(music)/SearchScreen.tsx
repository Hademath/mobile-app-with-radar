// app/SearchScreen.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const dummyRecent = Array(5).fill({
  name: "Rema",
  type: "Artiste",
  avatar: require("@/assets/images/avatars/avatar1.png"), 
});

const SearchScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 bg-primary px-4 pt-12">
      {/* Search Bar Row */}
      <View className="flex-row  items-center mb-4">
        <View className="flex-1 bg-searchinputcolor flex-row items-center px-3 py-0  rounded-2xl">
          <Ionicons name="search-outline" size={20} color="#3C3C4399" />
          <TextInput
            autoFocus
            value={search}
            onChangeText={setSearch}
            placeholder="What you looking for?"
            placeholderTextColor="#3C3C4399"
            className="flex-1 ml-2 px-3 text-accent/60"
          />
          <Ionicons name="mic" size={20} color="#3C3C4399" />
        </View>
        <TouchableOpacity onPress={() => router.back()} className="ml-3">
          <Text className="text-white text-base font-medium">Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      <Text className="text-white text-base font-semibold mb-4">
        Recent searches
      </Text>

      <FlatList
        data={dummyRecent}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-3">
              <Image
                source={item.avatar}
                className="w-12 h-12 rounded-full bg-cyan-400"
                resizeMode="cover"
              />
              <View>
                <Text className="text-white font-semibold">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.type}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="close" size={24} color="#777" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
