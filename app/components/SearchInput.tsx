// SearchInput.tsx
import {  TextInput, Pressable } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SearchInput = () => {
  const router = useRouter();

  return (
    <Pressable
      className="flex-row items-center bg-searchinputcolor px-3 py-2 rounded-3xl"
      onPress={() => router.push("/SearchScreen")} // 👈 Navigate to full screen search page
    >
      <Ionicons name="search-outline" size={24} color="#3C3C4399" />
      <TextInput
        pointerEvents="none"
        editable={false}
        placeholder="What are you looking for?"
        placeholderTextColor="#3C3C4399"
        className="flex-1 text-inactive/60 px-3"
      />
      <FontAwesome5 name="microphone" size={20} color="#3C3C4399" />
    </Pressable>
  );
};

export default SearchInput;
