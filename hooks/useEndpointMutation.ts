import { MutationFunction, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";

interface Props<T> {
  // callback: (res: any) => void;
  mutationKey?: string[];
  mutationFn: MutationFunction<any, T>;
}
const useDataMutation = <T>({ mutationFn, mutationKey }: Props<T>) => {
  const [response, setResponse] = useState<any>();
  const toast = useToast();
  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (res) => {
      if (res?.success) {
        toast.show(res.message, {
          placement: "top",
        });
      }
      if (res?.data) {
        setResponse(res.data);
        // callback(res.data);
      }
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error && error.message?.toLowerCase() === "network error") {
          toast.show(
            "Unable to connect to the server. Please check your network and try again",
            {
              type: "warning",
            }
          );
          return;
        }
        if (typeof error.response?.data?.message !== "string") {
          Object.keys(error.response?.data?.message).map((field) => {
            toast.show(error.response?.data?.message[field][0], {
              // data: error.response?.data?.message[field][0],
              type: "danger",
            });
            console.error("38", error.response?.data?.message[field][0]);
          });
          return;
        }
        toast.show(error.response?.data?.message, {
          type: "danger",
          placement: "top",
        });

        console.log("45 endpoint", error.request);
        console.error("45", error.response?.data);
        return;
      }
      if (error instanceof Error) {
        toast.show(error.message, {
          type: "danger",
        });
        console.error("52", error.message);
        return;
      }
      if (typeof error === "string") {
        toast.show(error, {
          type: "danger",
        });
        return;
      }
      console.log(error);
    },
  });
  return {
    isPending: mutation.isPending,
    mutate: mutation.mutate,
    error: mutation.error,
    response,
  };
};
export default useDataMutation;
