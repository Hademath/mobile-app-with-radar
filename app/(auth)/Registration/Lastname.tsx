import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";
import useRegisterStore from "@/store/register-store";
import { lastNameSchema } from "@/schemas/registerSchema";
import React from "react";

export default function LastNameScreen() {
  const router = useRouter();
  const { updateData } = useRegisterStore();
  const handleNext = (val: string) => {
    const parsed = lastNameSchema.safeParse({ lastName: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }
    console.log(parsed);
    router.push("/Registration/Email");
    updateData({ lastName: val });
  };

  return (
    <>
      <RegistrationStepProps
        title="What’s your last name?"
        description="Please enter your last name."
        placeholder="Last Name"
        nextLabel="Next"
        onNext={handleNext}
      />
    </>
  );
}
