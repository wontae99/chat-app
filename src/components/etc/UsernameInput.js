import { StyleSheet, TextInput } from "react-native";

export default function UsernameInput({ name, setName }) {
  return (
    <TextInput
      value={name}
      onChangeText={setName}
      placeholder={"Username"}
      keyboardType={"default"}
      style={styles.textInput}
      textAlign="center"
      placeholderTextColor="#ccc"
      autoFocus={true}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 36,
    color: "white",
  },
});
