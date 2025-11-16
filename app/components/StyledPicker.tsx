import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Platform } from "react-native";
import { ChevronDown } from "lucide-react-native";

interface StyledPickerProps {
  value: string | null;
  onValueChange: (val: string) => void;
  items: { label: string; value: string }[];
  placeholder: { label: string; value: null };
  zIndex?: number;
}

export default function StyledPicker({
  value,
  onValueChange,
  items,
  placeholder,
  zIndex = 1000,
}: StyledPickerProps) {
  const [open, setOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(items);

  return (
    <View className="mb-3" style={{ zIndex, position: "relative" }}>
      <DropDownPicker
        open={open}
        value={value}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={(cb) => onValueChange(cb(value))}
        setItems={setDropdownItems}
        placeholder={placeholder.label}
        ArrowDownIconComponent={() => <ChevronDown color="#fff" size={20} />}
        dropDownDirection="BOTTOM"
        style={{
          backgroundColor: "#1A1A1A",
          borderRadius: 12,
        }}
        dropDownContainerStyle={{
          backgroundColor: "#1A1A1A",
          borderColor: "#333",
          borderRadius: 12,
          maxHeight: 250, // Controls visible area
          zIndex,
          elevation: 10, // Android
        }}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
          persistentScrollbar: true,
          showsVerticalScrollIndicator: true,
          scrollEnabled: true,
          scrollToOverflowEnabled: true
          
        }}
        textStyle={{
          color: "#fff",
          fontSize: 16,
        }}
        placeholderStyle={{
          color: "#888",
        }}
        listItemLabelStyle={{
          color: "#fff",
        }}
      />
    </View>
  );
}
