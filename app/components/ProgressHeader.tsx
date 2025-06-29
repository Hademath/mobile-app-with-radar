// components/ui/ProgressHeader.tsx
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

interface Props {
  step: number;
  total: number;
}

export default function ProgressHeader({ step, total }: Props) {
  const router = useRouter();
  const progress = (step / total) * 100;

  return (
    <View className="w-full px-6 pt-6">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ChevronLeft size={28} color="white" />
      </TouchableOpacity>
      <View className="w-full h-2 bg-neutral-800 rounded-full">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-white rounded-full"
        />
      </View>
    </View>
  );
}
