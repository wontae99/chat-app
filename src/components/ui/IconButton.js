import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, color, onPress, btnStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [btnStyle, styles.pressed] : [btnStyle]
      }
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
