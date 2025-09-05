import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";
import useRegisterStore from "@/store/register-store";
import { emailSchema } from "@/schemas/registerSchema";
import AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";

export default function EmailScreen({ setSteps }: { setSteps: (val: number) => void }) {
  const { updateData } = useRegisterStore();
  const API = new AuthEndpoints();

  
  const { isPending, mutate } = useDataMutation({
    mutationFn: API.verifyEmail,
    mutationKey: ["verify email"],
  });


  const handleNext = (val: string) => {
    const parsed = emailSchema.safeParse({ email: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }
    console.log(updateData);
    router.push("/Registration/VerifyCode");
    updateData({ email: val });
    setSteps(4);
  };

  const router = useRouter();
  return (
    <>
      <RegistrationStepProps
        title="What's your email"
        description="Please enter your email address."
        placeholder="Email"
        nextLabel="Next"
        onNext={handleNext}
      />
    </>
  );
}
