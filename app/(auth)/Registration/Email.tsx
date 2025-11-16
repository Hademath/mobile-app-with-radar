import { useRouter } from "expo-router";
import RegistrationStepProps from "../../components/RegistrationStep";
import useRegisterStore from "@/store/register-store";
import { emailSchema } from "@/schemas/registerSchema";
import * as AuthEndpoints from "@/endpoints/authEndpoints";
import useDataMutation from "@/hooks/useEndpointMutation";
import React from "react";

export default function EmailScreen() {

  const {updateData } = useRegisterStore();
  // const API = new AuthEndpoints();
  const router = useRouter();


  //  OTP request mutation
  const reason = "register";
  const { isPending, mutate } = useDataMutation({
    mutationFn: (email: string) => AuthEndpoints.requestOtp(reason, email),
    mutationKey: ["verify email"],
  });

  // console.log("Current registration data:", data);
  
  const handleNext = (val: string) => {
    const parsed = emailSchema.safeParse({ email: val });
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    mutate(val,
      {
        
        onSuccess: (res) => {
          updateData({ email: val });
          alert(res.data.message);
          router.push("/Registration/VerifyCode");
        },
        onError: (err: any) => {
          alert("Failed to send OTP. Please try again: " + err?.response?.data?.message || err.message || err);
        },
      }
    );
  };
  return (
    <>
      <RegistrationStepProps
        title="What's your email"
        description="Please enter your email address."
        placeholder="Email"
        disabled={isPending}
        keyboardType="email-address"
        secureTextEntry={false}
        nextLabel={isPending ? "Verifying..." : "Next"}
        onNext={handleNext}
      />
    </>
  );
}
