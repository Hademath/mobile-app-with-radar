// components/StyledPicker.tsx
import { View, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { ChevronDown } from "lucide-react-native";

interface StyledPickerProps {
  value: string;
  onValueChange: (val: string) => void;
  items: { label: string; value: string }[];
  placeholder: { label: string; value: null };
}

export default function StyledPicker({
  value,
  onValueChange,
  items,
  placeholder,
}: StyledPickerProps) {
  return (
    <View className="bg-[#1A1A1A] rounded-xl px-4 py-5 mb-5 justify-center">
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        Icon={() => <ChevronDown color="#888" size={20} />}
        style={{
          inputIOS: {
            fontSize: 18,
            color: "#fff",
            paddingVertical: 14,
            paddingHorizontal: 0,
          },
          inputAndroid: {
            fontSize: 18,
            color: "#888",
            paddingVertical: 12,
            paddingHorizontal: 0,
          },
          placeholder: {
            color: "#888",
            fontSize: 18,
          },
          iconContainer: {
            top: Platform.OS === "ios" ? 20 : 16,
            right: 12,
          },
        }}
      />
    </View>
  );
}
