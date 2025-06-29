import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";

export default function LastNameScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <RegistrationStepProps
        title=" Enter your last name"
        description="This will be used to personalize your experience."
        placeholder="Last Name"
        nextLabel="Next"
        onNext={(val) => {
          router.push("/Registration/Email");
        }}
      />
    </SafeAreaView>
  );
}
