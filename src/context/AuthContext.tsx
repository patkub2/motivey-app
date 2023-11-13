// AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
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

  // Part of AuthContext.tsx

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://192.168.0.115:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Register error response:", textResponse);
        throw new Error("Network response was not ok");
      }

      // Handle the response. For now, let's log it.
      const data = await response.json();
      console.log("Registration successful:", data);

      // You can choose to automatically sign in the user after registration
      // or navigate them to the login screen to log in manually.
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration errors appropriately
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
