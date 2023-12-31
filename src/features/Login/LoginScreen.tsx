import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { AuthContext } from "../../context/AuthContext"; // You'll need to implement this
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation"; // Adjust the path as necessary

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  console.log(navigation);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    const success = await signIn(email, password);
    if (success) {
      navigation.navigate("Main");
    } else {
      // Handle login failure (e.g., show an error message)
    }
  };

  const handleLoginDev = async () => {
    const success = await signIn("test@test.com", "test");
    if (success) {
      navigation.navigate("Main");
    } else {
      // Handle login failure (e.g., show an error message)
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/sword.png")}
        style={styles.logo}
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
      <Button title="Log In" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
      <Button title="Log In Development" onPress={handleLoginDev} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
