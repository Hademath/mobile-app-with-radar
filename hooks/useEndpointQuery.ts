"use client";

import {
  QueryFunction,
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useToast } from "react-native-toast-notifications";

interface Props<T> {
  queryKey: string[];
  queryFn: QueryFunction<T>;
  enabled?: boolean;
  cb?: () => void;
  staleTime?: number;
}
const useEndpointQuery = <T extends Record<string, any>>({
  queryKey,
  queryFn,
  enabled = true,
  cb,
  staleTime,
}: Props<T>): {
  isFetching?: boolean;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  data: T | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
} => {
  const toast = useToast();
  const { isLoading, error, isError, data, isFetching, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: enabled,
    staleTime: staleTime ?? 0,
  });

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status && error.response?.status >= 400) {
          console.error(error.response.config.url);
          console.error(
            JSON.stringify(error.response.data, null, 2)
          );
        } else {
          console.log(error.request);
          console.error(error);
        }
      } else {
        // toast.show("An Error Occurred", {
        // 	data: error.message,
        // 	type: "danger",
        // });
        console.error( error);
      }
    }
  }, [error, isError]);

  return { isLoading, isError, error, data, isFetching, refetch };
};

export default useEndpointQuery;

