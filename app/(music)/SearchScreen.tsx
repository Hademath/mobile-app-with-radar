import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useEndpointQuery from "@/hooks/useEndpointQuery";
import * as musicAPI from "../../endpoints/musicEndpoints";
import { setParams } from "expo-router/build/global-state/routing";

// Types
interface Song {
  uuid: string;
  title: string;
  artistId: string;
  artworkUrl: string | null;
  streamUrl: string;
  artist: {
    uuid: string;
    name: string;
    avatar: string | null;
  };
  genre: {
    uuid: string;
    name: string;
  };
  totalPlays: number;
}

interface RecentSearch {
  id: string;
  name: string;
  type: "song" | "artist";
  avatar: string | null;
  timestamp: number;
}

const RECENT_SEARCHES_KEY = "@recent_searches";
const MAX_RECENT_SEARCHES = 10;

const SearchScreen = () => {

  const router = useRouter();
    const params = useLocalSearchParams();

    // Get query from route params if coming from Browse screen
  const initialQuery = (params.query as string) ?? "";
  
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch search results
  const { data, isLoading, error } = useEndpointQuery({
    queryFn: () => musicAPI.searchSongs(debouncedSearch),
    queryKey: ["search songs", debouncedSearch],
    enabled: debouncedSearch.length > 0, // Only search if there's a query
  });

  const songs: Song[] = data?.data?.data || [];

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentSearches(parsed);
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  const saveRecentSearch = async (item: Omit<RecentSearch, "timestamp">) => {
    try {
      const newSearch: RecentSearch = {
        ...item,
        timestamp: Date.now(),
      };

      // Remove duplicates and add new search at the beginning
      const filtered = recentSearches.filter((s) => s.id !== item.id);
      const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const handleRemoveRecent = async (id: string) => {
    try {
      const updated = recentSearches.filter((s) => s.id !== id);
      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing recent search:", error);
    }
  };

  const clearAllRecent = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (error) {
      console.error("Error clearing recent searches:", error);
    }
  };

  const handleSongPress = (song: Song) => {
    // Save to recent searches
    saveRecentSearch({
      id: song.uuid,
      name: song.title,
      type: "song",
      avatar: song.artworkUrl,
    });

    // Navigate to player
    router.push(`/(music)/MusicPlayerWithPrompts?songId=${song.uuid}`);
  };

  const handleRecentSearchPress = (item: RecentSearch) => {
    if (item.type === "song") {
      router.push(`/(music)/MusicPlayerWithPrompts?songId=${item.id}`);
    } else {
      // Navigate to artist profile if you have that route
      // router.push(`/(music)/ArtistProfile?artistId=${item.id}`);
      console.log("Artist profile navigation not implemented");
    }
  };

  const renderSearchResult = ({ item }: { item: Song }) => (
    <TouchableOpacity
      onPress={() => handleSongPress(item)}
      className="flex-row items-center mb-4 active:opacity-70"
    >
      <Image
        source={
          item.artworkUrl
            ? { uri: item.artworkUrl }
            : require("@/assets/images/content/rema1.jpg")
        }
        className="w-14 h-14 rounded-lg bg-neutral-800"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-gray-400 text-sm" numberOfLines={1}>
            {item.artist?.name || "Unknown Artist"}
          </Text>
          {item.genre?.name && (
            <>
              <Text className="text-gray-500 mx-2">•</Text>
              <Text className="text-gray-400 text-sm">{item.genre.name}</Text>
            </>
          )}
        </View>
        {item.totalPlays > 0 && (
          <Text className="text-gray-500 text-xs mt-0.5">
            {item.totalPlays.toLocaleString()} plays
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }: { item: RecentSearch }) => (
    <View className="flex-row items-center justify-between mb-5">
      <TouchableOpacity
        onPress={() => handleRecentSearchPress(item)}
        className="flex-row items-center gap-3 flex-1"
      >
        <Image
          source={
            item.avatar
              ? { uri: item.avatar }
              : require("@/assets/images/avatars/avatar1.png")
          }
          className="w-12 h-12 rounded-full bg-cyan-400"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-white font-semibold" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-gray-400 text-sm capitalize">{item.type}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRemoveRecent(item.id)}
        className="p-2"
      >
        <Ionicons name="close" size={24} color="#777" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => {
    if (debouncedSearch && !isLoading && songs.length === 0) {
      return (
        <View className="items-center justify-center mt-20">
          <Ionicons name="search-outline" size={64} color="#444" />
          <Text className="text-gray-400 text-lg mt-4">No results found</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center px-8">
            Try searching with different keywords
          </Text>
        </View>
      );
    }

    if (!debouncedSearch && recentSearches.length === 0) {
      return (
        <View className="items-center justify-center mt-20">
          <Ionicons name="time-outline" size={64} color="#444" />
          <Text className="text-gray-400 text-lg mt-4">No recent searches</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center px-8">
            Your search history will appear here
          </Text>
        </View>
      );
    }

    return null;
  };

  const showResults = debouncedSearch.length > 0;

  return (
    <View className="flex-1 bg-primary px-4 pt-12">
      {/* Search Bar Row */}
      <View className="flex-row items-center mb-4">
        <View className="flex-1 bg-searchinputcolor flex-row items-center px-3 py-0  rounded-2xl">
          <Ionicons name="search-outline" size={20} color="#3C3C4399" />
          <TextInput
            autoFocus
            value={search}
            onChangeText={setSearch}
            placeholder="What you looking for?"
            placeholderTextColor="#3C3C4399"
            className="flex-1 ml-2 text-accent/60"
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} className="mr-2">
              <Ionicons name="close-circle" size={20} color="#3C3C4399" />
            </TouchableOpacity>
          )}
          <Ionicons name="mic" size={20} color="#3C3C4399" />
        </View>
        <TouchableOpacity onPress={() => router.back()} className="ml-3">
          <Text className="text-white text-base font-medium">Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {showResults ? (
        <View className="flex-1">
          {/* Results Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-base font-semibold">
              {isLoading
                ? "Searching..."
                : `${songs.length} result${songs.length !== 1 ? "s" : ""}`}
            </Text>
          </View>

          {/* Loading State */}
          {isLoading && (
            <View className="items-center justify-center mt-10">
              <ActivityIndicator size="large" color="#40E0D0" />
              <Text className="text-gray-400 mt-4">Searching...</Text>
            </View>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <View className="items-center justify-center mt-20">
              <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
              <Text className="text-red-400 text-lg mt-4">Search failed</Text>
              <Text className="text-gray-500 text-sm mt-2">
                Please try again
              </Text>
            </View>
          )}

          {/* Results List */}
          {!isLoading && !error && (
            <FlatList
              data={songs}
              keyExtractor={(item) => item.uuid}
              renderItem={renderSearchResult}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={
                songs.length === 0 ? { flexGrow: 1 } : undefined
              }
            />
          )}
        </View>
      ) : (
        // Recent Searches
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-base font-semibold">
              Recent searches
            </Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearAllRecent}>
                <Text className="text-secondary text-sm font-medium">
                  Clear all
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={recentSearches}
            keyExtractor={(item) => item.id}
            renderItem={renderRecentSearch}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={
              recentSearches.length === 0 ? { flexGrow: 1 } : undefined
            }
          />
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
