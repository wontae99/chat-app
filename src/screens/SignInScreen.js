import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { login } from "../util/auth";
import { useChatContext } from "stream-chat-expo";
import { AuthContext } from "../store/auth-context";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function SignInScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

  async function signInHandler() {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);

      await client.connectUser(
        {
          id: token.localId,
          email: token.email,
        },
        client.devToken(token.localId)
      );
    } catch (err) {
      Alert.alert("Failed to sign in.", err.message || "Please try again.");
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>We are so excited to see you again</Text>

        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.forgotPasswordText}>Register</Text>
        </Pressable>

        <PrimaryButton onPress={signInHandler} text="Log In" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393E",
    flex: 1,
    padding: 10,
    paddingVertical: 50,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
  forgotPasswordText: {
    color: "#4CABEB",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
});
