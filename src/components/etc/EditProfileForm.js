import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";

import UsernameInput from "./UsernameInput";
import VerificationForm from "./VerificationForm";
import IconButton from "../ui/IconButton";
import { useState } from "react";
import EmailInput from "./EmailInput";

const EditProfileForm = ({ mode, setModalVisible, inputProps }) => {
  const { name, setName, email, setEmail, password, setPassword } = inputProps;
  const [verified, setVerified] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <IconButton
            icon="close-sharp"
            onPress={() => setModalVisible(false)}
          />
          <Pressable
            style={styles.confirmBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.btnText}>Confirm</Text>
          </Pressable>
          {mode === "username" && (
            <UsernameInput name={name} setName={setName} />
          )}
          {mode === "email" && !verified && (
            <VerificationForm
              password={password}
              setPassword={setPassword}
              email={email}
              verified={verified}
              setVerified={setVerified}
            />
          )}
          {mode === "email" && verified && (
            <EmailInput email={email} setEmail={setEmail} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  confirmBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    padding: 4,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    zIndex: 100,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 36,
    color: "white",
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default EditProfileForm;
