import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {  Ionicons, } from "@expo/vector-icons";
import { ArrowLeft } from "lucide-react-native";

export default function Index() {
  return (
    <LinearGradient
      colors={["#0f1e1d", "#000000", "#242424"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <ScrollView className="flex-1 px-4 pt-14">
        {/* Top Row: Avatar - Days - Balance */}

        <View className="flex-col justify-between gap-3 mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-8 h-8 rounded-full bg-white items-center justify-center mr-4 mb-5"
          >
            <ArrowLeft size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-white items-center text-2xl font-bold">
            What’s New
          </Text>
          <Text className="text-boarderColor">The latest releases from emerging artistes you follow.</Text>
        </View>


        {/* Music Card */}
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} className=" rounded-3xl mb-6 overflow-hidden">
            <View className="flex-row gap-3 items-center space-x-2 mb-4">
              <Image
                source={require("@/assets/images/avatars/avatar2.png")}
                className="w-10 h-10 rounded-full"
              />
              <Text className="text-white font-semibold">
                More of <Text className="font-bold">Afrobeat</Text>
              </Text>
            </View>

            <View className="bg-accent rounded-3xl overflow-hidden">
              <Image
                className="w-full h-56"
                resizeMode="cover"
                source={require("@/assets/images/content/rema1.jpg")}
              />

              <View
                className="absolute top-3 right-2 mr-3
               bg-black/40 p-2 rounded-full"
              >
                <Ionicons name="volume-high" size={16} color="white" />
              </View>
              <View className="p-4 space-y-1">
                <View className="flex-row items-center gap-2 space-x-2 mb-2">
                  <Image
                    source={require("@/assets/images/ArtisteRadarLogo.png")}
                    className="w-5 h-5"
                  />
                  <Text className="text-xs text-gray-400 font-semibold">
                    Genre
                  </Text>
                </View>

                <Text className="text-2xl text-white font-bold">Ravage</Text>
                <Text className="text-sm text-tertiary mt-2">
                  EP • Rema • 5 songs • 2023
                </Text>
                <Text className="text-sm text-tertiary mt-2 ">
                  Because you listen to pop music
                </Text>
                <View className="flex-row justify-between mt-4 gap-4 space-x-4">
                  <TouchableOpacity className="flex-1 h-10 bg-white items-center justify-center rounded-xl">
                    <Text className="text-black font-semibold">
                      Give feedback
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-1 h-10 bg-primary items-center justify-center rounded-xl">
                    <Text className="text-white font-semibold">Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        {/* FAB (Floating Action Button) */}
        {/* <Link href="/(tabs)/Create" asChild>
          <TouchableOpacity className="absolute bottom-12 right-6 w-16 h-16 bg-black rounded-full items-center justify-center shadow-lg">
            <Text className="text-4xl text-cyan-400 -mt-1">＋</Text>
          </TouchableOpacity>
        </Link> */}
      </ScrollView>
    </LinearGradient>
  );
}
