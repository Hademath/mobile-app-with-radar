import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import CreateAccountHeader from "@/app/components/CreateAccountHeader";
import RegistrationStepProps from "../../components/RegistrationStep";

export default function FirstNameScreen() {
  const [firstName, setFirstName] = useState("");
  const router = useRouter();

  return (
    <>
      <RegistrationStepProps
        title="What’s your first name?"
        description="Please enter your first name."
        placeholder="First Name"
        nextLabel="Next"
        onNext={(val) => {
          router.push("/Registration/Lastname");
        }}
      />
    </>
    // <SafeAreaView className="flex-1 bg-black px-6">
    //   <CreateAccountHeader />
    //   <View className="flex-1 py-10">
    //     <Text className="text-white text-2xl font-bold mb-1">
    //       What&apos;s your first name?
    //     </Text>
    //     <Text className="text-boarderColor mb-4">
    //       Please enter your first name.
    //     </Text>
    //     <TextInput
    //       value={firstName}
    //       onChangeText={setFirstName}
    //       placeholder="First name"
    //       placeholderTextColor="#888"
    //       className="bg-[#1A1A1A] text-white px-4 py-5 rounded-xl mb-20"
    //     />

    //     <View className="items-center">
    //       <TouchableOpacity
    //         onPress={() => router.push("./Lastname")}
    //         className="bg-white py-4 px-12 rounded-xl items-center"
    //       >
    //         <Text className="text-center text-2xl text-black font-semibold">
    //           Next
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
}
