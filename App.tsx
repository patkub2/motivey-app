// App.tsx
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { TamaguiProvider } from "tamagui";
import AppContent from "./AppContent"; // Adjust the path if necessary
import config from "./tamagui.config";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalProvider } from "./src/context/GlobalContext";
import Toast from "react-native-toast-message";
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  // Prevent the splash screen from auto-hiding until fonts are loaded
  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync().catch(console.warn);
    return null; // or a custom loading component if you prefer
  }

  // Once the fonts are loaded, allow the splash screen to hide
  SplashScreen.hideAsync().catch(console.warn);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <GlobalProvider>
          <TamaguiProvider config={config}>
            <AppContent />
          </TamaguiProvider>
        </GlobalProvider>
      </AuthProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
