import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";

// General Zod schema for input steps
export const inputSchema = z.object({
  input: z
    .string()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Input too long" }),
});

interface RegistrationStepProps {
  title: string;
  description?: string;
  resendText?: string;
  noCode?: string;
  placeholder?: string;
  nextLabel?: string;
  onNext: (value: string) => void;
  progress?: number;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  variant?: "text" | "otp" | "dropdown" | "avatar";
  options?: string[]; // for dropdown
  defaultValue?: string;
  // schema?: any; 
}

export default function RegistrationStep({
  title,
  description,
  placeholder = "",
  nextLabel = "Next",
  onNext,
  progress,
  secureTextEntry,
  multiline,
  keyboardType,
  variant = "text",
  options = [],
  defaultValue = "",
  // schema,
}: RegistrationStepProps) {
  const [image, setImage] = useState<string | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string>("");
  // const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inputSchema),
    defaultValues: { input: defaultValue },
  });

  const handleFormSubmit = (data: any) => {
    console.log(data)
    if (variant === "dropdown") return onNext(dropdownValue);
    if (variant === "otp") return onNext(otp.join(""));
    if (variant === "avatar") return onNext(image || "");
    return onNext(data.input);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary px-6">
      <CreateAccountHeader />

      <View className="flex-1 py-10">
        <Text className="text-white text-2xl font-bold mb-1">{title}</Text>
        {!!description && (
          <Text className="text-boarderColor mb-4">{description}</Text>
        )}

        {/* Text Input */}
        {variant === "text" && (
          <Controller
            control={control}
            name="input"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-20"
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                keyboardType={keyboardType}
              />
            )}
          />
        )}

        {/* OTP Input */}
        {variant === "otp" && (
          <View className="flex-row justify-between gap-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(text) => {
                  const newOtp = [...otp];
                  newOtp[index] = text.slice(-1);
                  setOtp(newOtp);
                }}
                maxLength={1}
                keyboardType="number-pad"
                className="w-12 h-14 bg-[#1A1A1A] text-white text-xl text-center rounded-lg"
              />
            ))}
          </View>
        )}

        {/* Dropdown */}
        {variant === "dropdown" && (
          <View className="bg-[#1A1A1A] p-4 rounded-xl">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-2"
                  onPress={() => setDropdownValue(item)}
                >
                  <Text
                    className={`text-lg text-white ${
                      dropdownValue === item ? "text-secondary font-bold" : ""
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Avatar Picker */}
        {variant === "avatar" && (
          <Pressable onPress={pickImage} className="items-center mb-4">
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-28 h-28 rounded-full"
              />
            ) : (
              <View className="w-28 h-28 bg-[#1A1A1A] rounded-full justify-center items-center">
                <Text className="text-white">Pick Image</Text>
              </View>
            )}
          </Pressable>
        )}

        {/* Error */}
        {errors.input?.message && (
          <Text className="text-red-500 mb-8">{String(errors.input.message)}</Text>
        )}

        <View className="items-center">
          <TouchableOpacity
            onPress={handleSubmit(handleFormSubmit)}
            className="bg-white py-3 px-12 rounded-xl items-center"
          >
            <Text className="text-center text-2xl text-black font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar */}
      {progress !== undefined && (
        <View className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <View
            style={{ width: `${progress * 100}%` }}
            className="h-2 bg-secondary"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
