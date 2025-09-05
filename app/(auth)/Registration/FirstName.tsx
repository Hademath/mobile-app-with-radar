import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";
import useRegisterStore from "@/store/register-store";
import { firstNameSchema } from "@/schemas/registerSchema";




export default function FirstNameScreen({ setSteps }: { setSteps: (val: number) => void }) {
  
  
  const { updateData } = useRegisterStore();
  const handleNext = (val:string) => {
    const parsed = firstNameSchema.safeParse({ firstName: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }
    console.log(parsed);
    router.push("/Registration/Lastname");
    updateData({ firstName: val });
    setSteps(2);
  };



  const router = useRouter();
  return (
    <>
      <RegistrationStepProps
        title="What’s your first name?"
        description="Please enter your first name."
        placeholder="First Name"
        nextLabel="Next"
        onNext={handleNext}
      />
    </>
  );
}
