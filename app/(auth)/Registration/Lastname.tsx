import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";

export default function LastNameScreen() {
  const router = useRouter();

  return (
    <>
      <RegistrationStepProps
        title="What’s your last name?"
        description="Please enter your last name."
        placeholder="Last Name"
        nextLabel="Next"
        onNext={(val) => {
          router.push("/Registration/Email");
        }}
      />
    </>
  );
}
