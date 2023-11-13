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
    try {
      const response = await fetch("http://192.168.0.115:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const textResponse = await response.text(); // Read the response as text
        console.error("Login error response:", textResponse);
        throw new Error("Network response was not ok");
      }

      const token = await response.text(); // Directly reading the response as text
      if (token.startsWith("Bearer ")) {
        const actualToken = token.split(" ")[1];
        setUserToken(actualToken);
        await SecureStore.setItemAsync("userToken", actualToken);
      } else {
        throw new Error("Invalid token format");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors appropriately
    }
  };

  const signOut = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync("userToken");
  };

  const signUp = async (email: string, password: string) => {
    // Implement your sign-up logic here
    // Similar to signIn, but for user registration
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
