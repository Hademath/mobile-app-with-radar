
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ProgressHeader from "../../components/ProgressHeader";
import useProfileSetupStore from "@/store/profilesetup-store";
import { usernameSchema } from "@/schemas/registerSchema";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";

export default function MusicProUniqueName() {
 const [username, setUsername] = useState("");
      const [error, setError] = useState("");
      const router = useRouter();

      const API = new AuthEndpoints();
      const { updateData } = useProfileSetupStore();

      // mutation for backend username validation
      const { isPending, mutate } = useDataMutation({
        mutationFn: (username: string) => API.verifyUsername({ username }),
        mutationKey: ["verify username"],
      });

      // run validation when typing (debounced)
      useEffect(() => {
        if (!username) {
          setError("");
          return;
        }

        // 1. local zod validation
        const parsed = usernameSchema.safeParse({ username });
        if (!parsed.success) {
          setError(parsed.error.errors[0].message);
          return;
        }

        setError(""); // clear local errors

        // 2. debounce API call
        const timeout = setTimeout(() => {
          mutate(username, {
            onSuccess: () => {
              setError(""); // available
            },
            onError: (err: any) => {
              setError(err?.response?.data?.message || "Username unavailable");
            },
          });
        }, 600); // wait 600ms after typing

        return () => clearTimeout(timeout);
      }, [mutate, username]);

      const handleNext = () => {
        if (error) return; // block navigation if invalid

        updateData({ username });
        router.push("./Genres");
      };
  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <ProgressHeader step={2} total={5} type={"onboardingBar"} />
      <View className="flex-1 py-10 ">
        <View>
          <Text className="text-white text-3xl font-bold mb-1 font-clash uppercase">
            Choose a Unique name
          </Text>
          <Text className="text-boarderColor mb-4">
            Select an anonymous name from our suggestions or create your own
          </Text>
        </View>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Anonymous"
          placeholderTextColor="#888"
          autoCapitalize="none"
          className="bg-[#1A1A1A] text-white px-6 py-4 rounded-xl mb-20"
        />
        {error ? (
          <Text className="text-red-500 mt-2">{error}</Text>
        ) : (
          username.length > 0 && (
            <Text className="text-green-500 mt-2">Username available ✅</Text>
          )
        )}
        <View className="items-center">
          <TouchableOpacity
            disabled={!!error || !username}
            onPress={handleNext}
            className={`py-4 px-14 rounded-xl items-center ${
              error || !username ? "bg-gray-400" : "bg-white"
            }`}
          >
            <Text className="text-center text-2xl text-black font-normal">
              {isPending ? "Checking..." : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
