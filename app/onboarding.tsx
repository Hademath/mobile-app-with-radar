import { useRouter } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, } from "react-native";
import { onboardingData } from "../data/onboardingData";
import  OnboardingItem  from "./components/OnboardingItem";
import { useRef, useState } from "react";
import Button from "./components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });

    } else {
      // await AsyncStorage.setItem("seen_onboarding", "true");
      router.replace("./Registration/GetStarted"); // navigate to main screen
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={onboardingData}
        horizontal
        pagingEnabled
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={(_, index) => index.toString()}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) =>
          setCurrentIndex( 
            Math.round(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width
            )
          )
        }
      />
      <View className="flex flex-row justify-between items-center px-6 py-2 absolute bottom-10 left-0 right-0">
        <Button
          textClassName="text-lg text-white"
          className="py-4 px-[50px]  rounded-xl items-center"
          title="Skip"
          onPress={() => router.replace("/Index")}
          // onPress={async () => {
          //   await AsyncStorage.setItem("seen_onboarding", "true");
          //   router.replace("/Index"); // navigate to main screen
          // }}
        />
        <Button
          className="bg-white py-4 px-[50px] font-bold rounded-xl items-center"
          title="Next"
          onPress={handleNext}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
  
}

