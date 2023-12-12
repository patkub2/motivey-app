import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, YStack, styled } from "tamagui";
import { AuthContext } from "../../context/AuthContext"; // Adjust the import path as necessary

const StyledButton = styled(Button, {
  padding: 10,
  margin: 20,
  backgroundColor: "#3B577D",
  color: "white",
  borderRadius: 10,
});

const OptionsScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const handleLogOff = async () => {
    await signOut();

    // Navigate to the Login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <YStack space>
        <StyledButton onPress={handleLogOff}>Log Off</StyledButton>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});

export default OptionsScreen;
