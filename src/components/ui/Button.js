import { Pressable, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, backgroundColor }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
