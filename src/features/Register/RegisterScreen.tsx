// RegisterScreen.tsx
import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await signUp(name, email, password);
      Alert.alert(
        "Registration Successful",
        "You have been successfully registered!",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "UserAlreadyExists") {
          Alert.alert(
            "Registration Failed",
            "A user with this email already exists."
          );
        } else {
          // Handle other types of errors
          Alert.alert(
            "Registration Failed",
            "An error occurred during registration: " + error.message
          );
        }
      } else {
        // Handle cases where the caught object is not an Error instance
        Alert.alert("Registration Failed", "An unexpected error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default RegisterScreen;
