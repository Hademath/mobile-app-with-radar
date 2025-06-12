import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LaunchScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      return router.replace("/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/launch.png")} style={styles.logo} />
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
    width: 250,
    height: 250,
  },
});
