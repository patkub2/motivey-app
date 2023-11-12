// AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    const token = await fakeApiSignIn(email, password);
    setUserToken(token);
    await SecureStore.setItemAsync("userToken", token);
  };

  const signOut = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync("userToken");
  };

  const signUp = async (email: string, password: string) => {
    const token = await fakeApiSignUp(email, password);
    setUserToken(token);
    await SecureStore.setItemAsync("userToken", token);
  };

  const fakeApiSignIn = async (
    email: string,
    password: string
  ): Promise<string> => {
    return `token_${email}`;
  };

  const fakeApiSignUp = async (
    email: string,
    password: string
  ): Promise<string> => {
    return `token_${email}`;
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
