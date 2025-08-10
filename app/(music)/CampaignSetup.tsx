import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SetStateAction, useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "rn-range-slider";

export default function CampaignSetup() {
  const router = useRouter();
  const [audienceType, setAudienceType] = useState("listeners");

  // Age Range State
  const [low, setLow] = useState(18);
  const [high, setHigh] = useState(30);

  // Duration State
  const [duration, setDuration] = useState(6);

  const handleSubmit = () => {
    const formData = {
      audienceType,
      low,
      high,
      duration,
    };

    console.log("Form Data:", formData);
      router.push("/SelectPromptTypes");
      
  };
// const renderThumb = useCallback(() => <Thumb />, []);
// const renderRail = useCallback(() => <Rail />, []);
// const renderRailSelected = useCallback(() => <RailSelected />, []);
// const renderLabel = useCallback((value: any) => <Label text={value} />, []);
// const renderNotch = useCallback(() => <Notch />, []);
// const handleValueChange = useCallback((low: SetStateAction<number>, high: SetStateAction<number>) => {
//   setLow(low);
//   setHigh(high);
// }, []);

  return (
    <ScrollView className="flex-1 bg-primary px-5 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-teal-400 font-semibold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-b border-accent mb-8" />

      <Text className="text-white font-bold text-3xl mb-2">Campaign Setup</Text>
      <Text className="text-tertiary mb-6">
        {" "}
        What kind of campaign do you want to run?{" "}
      </Text>

      {/* Select audience type */}
      <Text className="text-inputLabelCol font-semibold mb-3">
        {" "}
        Select audience type{" "}
      </Text>
      <View className="gap-4">
        {/* Listeners */}
        <Ionicons
          name={
            audienceType === "listeners"
              ? "radio-button-on"
              : "radio-button-off"
          }
          size={22}
          color="#2dd4bf"
        />
        <TouchableOpacity
          className="flex-row items-center bg-accent rounded-xl px-4 py-3"
          onPress={() => setAudienceType("listeners")}
        >
          <Text className="text-white ml-3 text-base">Listeners</Text>
        </TouchableOpacity>

        {/* Locked Option */}
        <View className="flex-row items-center bg-accent rounded-xl px-4 py-3 opacity-50">
          <Ionicons
            name={
              audienceType === "pro" ? "radio-button-on" : "radio-button-off"
            }
            size={22}
            color="#666"
          />
          <Text className="text-white ml-3 flex-1">
            Listeners & Music Pro’s
          </Text>
          <Ionicons name="lock-closed" size={18} color="#2dd4bf" />
        </View>
      </View>

      {/* Set Age */}
      <View className="mt-8">
        <Text className="text-white font-semibold mb-4">Set Age</Text>
        <View className="flex-row justify-between mb-2">
          <View className="bg-accent px-3 py-1 rounded-md">
            <Text className="text-white">{low}</Text>
          </View>
          <View className="bg-accent px-3 py-1 rounded-md">
            <Text className="text-white">{high}</Text>
          </View>
        </View>
        {/* <RangeSlider
          className=""
          //   style={styles.slider}
          min={0}
          max={100}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        /> */}
      </View>

      {/* Set duration */}
      <View className="mt-8">
        <Text className="text-white font-semibold mb-4">Set duration</Text>
        <View className="items-center mb-2">
          <View className="bg-accent px-3 py-1 rounded-md">
            <Text className="text-white">{duration} days</Text>
          </View>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={30}
          step={1}
          value={duration}
          minimumTrackTintColor="#2dd4bf"
          maximumTrackTintColor="#555"
          thumbTintColor="#2dd4bf"
          onValueChange={(val) => setDuration(val)}
        />
      </View>

      {/* Estimated Reach */}
      <View className="items-center mt-12 mb-12">
        <Text className="text-teal-400 text-base">Estimated Reach</Text>
        <Text className="text-white text-3xl font-bold">640 - 1,700</Text>
      </View>
    </ScrollView>
  );
}

