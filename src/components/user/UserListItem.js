import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import UserProfile from "./UserProfile";
import Colors from "../../constants/Colors";

export default function UserListItem({ id, name, image, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.userContainer, pressed && styles.pressed]}
      onPress={() => onPress(id)}
    >
      <UserProfile name={name} image={image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#a1a1a1",
  },
});
