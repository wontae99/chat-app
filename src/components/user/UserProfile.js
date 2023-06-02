import { View, Text, StyleSheet, Image } from "react-native";

export default function UserProfile({ name, image }) {
  return (
    <View style={styles.userItem}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userItem: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1 / 2,
    borderColor: "#ccc",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ededed",
  },
});
