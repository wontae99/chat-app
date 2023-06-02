import { TextInput, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmailInput({ email, setEmail }) {
  return (
    <>
      <View style={styles.stateContainer}>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 4,
            alignItems: "baseline",
          }}
        >
          <Text style={styles.verified}>Verified </Text>
          <Ionicons name="checkmark-circle-sharp" size={16} color="#3ee68f" />
        </View>
        <Text style={styles.verified}>Enter a new E-mail to change.</Text>
      </View>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"E-mail"}
        keyboardType={"email-address"}
        style={styles.textInput}
        textAlign="center"
        placeholderTextColor="#ccc"
        autoFocus={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    paddingBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  verified: {
    color: "#3ee68f",
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
