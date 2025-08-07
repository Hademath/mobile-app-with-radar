import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
// import clsx from "clsx"; // Optional: install  for className merging

const typeToColor = {
  launchBar: "bg-secondary",
  onboardingBar: "bg-white",
};

interface Props {
  step: number;
  total: number;
  type: "launchBar" | "onboardingBar";
  showBackArrow?: boolean; // optional, defaults to true
  containerClassName?: string; // optional override for outer View
}

export default function ProgressHeader({
  step,
  total,
  type,
  showBackArrow = true,
  containerClassName = "flex-row items-center pr-10 w-[100%]",
}: Props) {
  const router = useRouter();
  const progress = (step / total) * 100;

  return (
    <View className={containerClassName}>
      {showBackArrow && (
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
      )}
      <View className="w-full h-1 bg-neutral-800 rounded-full">
        <View
          style={{ width: `${progress}%` }}
          className={`h-full rounded-full ${typeToColor[type] || "bg-white"}`}
        />
      </View>
    </View>
  );
}
