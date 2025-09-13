import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const useRefetch = ({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  useFocusEffect(
    useCallback(() => {
      refetch({ throwOnError: false });
    }, [refetch])
  );

  return;
};
export default useRefetch;
