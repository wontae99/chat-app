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
import { useChatContext } from "stream-chat-expo";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function SignUpScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

  async function signUpHandler() {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);

      await client.connectUser(
        {
          id: token.localId,
          name: username,
          email: email,
          image: "https://reactnative.dev/img/tiny_logo.png",
        },
        client.devToken(token.localId)
      );

      //   const channel = client.channel("livestream", "public", {
      //     name: "Public",
      //   });
      //   await channel.watch();
    } catch (err) {
      Alert.alert("Failed to sign up.", err.message || "Please try again.");
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating A New Account..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Create Your Account!</Text>
        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Username"
        />
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
        />
        <Pressable
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.forgotPasswordText}>
            Already have your account?
          </Text>
        </Pressable>

        <PrimaryButton onPress={signUpHandler} text="Sign Up" />
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
  button: {
    backgroundColor: "#5964E8",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  btnPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
