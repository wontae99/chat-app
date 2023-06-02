import { StyleSheet, View, useWindowDimensions } from "react-native";

export default function Card({ backgroundColor, children }) {
  const { height } = useWindowDimensions();
  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor, minHeight: (height * 1) / 3 },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
