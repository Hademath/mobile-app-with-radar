import { Stack } from "expo-router";
import "./globals.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     background: "#000",
  //   },
  // };
  // const [fontsLoaded] = useFonts({
  //   "ClashDisplay-Regular": require("../assets/fonts/ClashDisplay-Regular.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return (
  //     <SafeAreaView className="flex-1 items-center justify-center">
  //       <Text>Loading...</Text>
  //     </SafeAreaView>
  //   );
  // }


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
          <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="launch" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/Registration" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />
          <Stack.Screen name="(menu)" options={{ headerShown: false }} />
          <Stack.Screen name="(music)" options={{ headerShown: false }} />
        </Stack>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
 