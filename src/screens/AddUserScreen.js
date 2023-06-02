import { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { useChatContext } from "stream-chat-expo";

import PrimaryButton from "../components/ui/PrimaryButton";
import { AuthContext } from "../store/auth-context";
import UserCheckBoxItem from "../components/user/UserCheckBoxItem";

export default function AddUserScreen() {
  const [email, setEmail] = useState();

  const { client } = useChatContext();
  const authCtx = useContext(AuthContext);
  const userId = authCtx.token.localId;

  async function sendFriendRequestHandler() {
    // let receiverData;
    // try {
    //   receiverData = await client.queryUsers({
    //     email: email,
    //   });

    //   if (!receiverData) {
    //     Alert.alert("Cannot Found The User.", "Please check an email input.");
    //     return;
    //   }

    //   console.log(receiverData, "addUserScreen");
    // } catch {
    //   Alert.alert("An Error occured", "Please try again.");
    // }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Make A New Friend!</Text>
      <Text style={styles.subtitle}>
        You need to input email to make friend
      </Text>

      <Text style={styles.inputLabel}>Add with an email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="grey"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <PrimaryButton
        text="Sending A Friend Request"
        onPress={sendFriendRequestHandler}
        disabled={email?.length === 0}
      />
    </View>
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
    fontSize: 25,
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
  inputLabel: {
    fontSize: 12,
    color: "lightgrey",
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
});
