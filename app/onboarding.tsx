import { useRouter } from "expo-router";
import { View, FlatList, StyleSheet, } from "react-native";
import { onboardingData } from "../data/onboardingData";
import  OnboardingItem  from "./components/OnboardingItem";
import { useRef, useState } from "react";
import Button from "./components/Button";


export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/Index"); // navigate to main screen
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.bottom}>
        <Button
          textClassName="text-lg text-white"
          className="bg-background px-4 py-2 rounded-lg w-[150px]"
          title="Skip"
          onPress={() => router.replace("/Index")}
        />
        <Button
          className="bg-white px-4 py-2 rounded-lg w-[150px]"
          title="Next"
          onPress={handleNext}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bottom: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  skip: { color: "#ccc", fontSize: 16 },
  next: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
