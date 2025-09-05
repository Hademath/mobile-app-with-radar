import { useAuthActions, useAuthStore } from "@/store/auth-store";
import { Redirect } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { View, Text } from "react-native";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuthStore();
  const { checkLoginStatus } = useAuthActions();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (!user?.access_token) {
    return <Redirect href="/(auth)/Login/LoginScreen" />;
  }
  return <React.Fragment>{children}</React.Fragment>;
};
export default AuthProvider;
