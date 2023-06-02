import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UserProfile from "./UserProfile";

export default function UserCheckBoxItem({ name, image, onPress, id }) {
  const [checked, setChecked] = useState(false);

  const onPressHandler = () => {
    setChecked(!checked);
    onPress(id);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.listBoxContainer,
        pressed && styles.pressed,
      ]}
      android_ripple={{ color: "#ccc" }}
      onPress={onPressHandler}
    >
      <UserProfile name={name} image={image} />
      <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listBoxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#5964E8",
  },
});
