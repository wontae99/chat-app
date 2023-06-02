import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";

import Button from "../ui/Button";
import { login } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";

export default function VerificationForm({
  email,
  password,
  setPassword,
  setVerified,
}) {
  const authCtx = useContext(AuthContext);
  async function verification() {
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      setVerified(true);
    } catch (err) {
      Alert.alert("Failed to verify.", "Please try again.");
    }
  }

  return (
    <>
      <View style={{ paddingBottom: 60 }}>
        <Text style={styles.warn}>Please verify before changing E-mail</Text>
      </View>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        keyboardType="default"
        style={styles.textInput}
        textAlign="center"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        autoCapitalize="none"
        autoFocus={true}
      />
      <Button title="verify" backgroundColor="#2196F3" onPress={verification} />
    </>
  );
}

const styles = StyleSheet.create({
  warn: {
    color: "#F194FF",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 36,
    color: "white",
  },
});
