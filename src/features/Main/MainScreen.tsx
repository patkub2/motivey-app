import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonSection from "../../components/ButtonSection";
import UserStats from "../../components/UserStats";
import BottomMenu from "../../components/BottomMenu";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const MainScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  console.log(navigation + " main screen");
  return (
    <View style={styles.container}>
      <UserStats />

      <ButtonSection />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFF6",
    borderWidth: 1,
    borderBlockColor: "red",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MainScreen;
