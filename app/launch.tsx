import { useEffect } from "react";
import { View, Image, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LaunchScreen() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      return router.replace("/onboarding");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  // useEffect(() => {
  //   const checkIfUserHasOnboarded = async () => {
  //     try {
  //       const hasSeenOnboarding = await AsyncStorage.getItem("seen_onboarding");

  //       // Small delay for splash feel (optional)
  //       setTimeout(() => {
  //         if (hasSeenOnboarding === "true") {
  //           router.replace("/onboarding"); // or /auth/register if that's your starting point
  //         } else {
  //           router.replace("/onboarding");
  //         }
  //       }, 1500);
  //     } catch (error) {
  //       console.error("Error reading onboarding status:", error);
  //       router.replace("/onboarding"); // fallback
  //     }
  //   };

  //   checkIfUserHasOnboarded();
  // }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/launch.png")}
        style={styles.logo}
      />
      <ActivityIndicator
        size="large"
        color="#ffffff"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});
