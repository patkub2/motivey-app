// RegisterScreen.tsx
import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation"; // Adjust the path as needed

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

  const handleRegister = () => {
    signUp(name, email, password);
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
