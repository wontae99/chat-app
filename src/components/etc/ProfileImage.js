import { useState } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/Colors";

export default function ProfileImage({ editing, initialImg }) {
  const navigation = useNavigation();
  const [pickedImg, setPickedImg] = useState(initialImg);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0]["uri"];
      setPickedImg(imageUri);
      navigation.setParams({ image: imageUri });
      console.log(pickedImg);
    } else {
      return;
    }
  };

  return (
    <Pressable disabled={!editing} onPress={pickImageAsync}>
      <Image
        source={{ uri: pickedImg }}
        style={[styles.image, editing && { opacity: 0.6 }]}
      />
      {editing && (
        <View style={styles.imageIconContainer}>
          <Ionicons name="pencil" color={Colors.dark.darkPrimary} size={20} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageIconContainer: {
    position: "absolute",
    top: 55,
    left: 55,
    transform: [{ translateX: -9 }, { translateY: -9 }],
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 36,
    borderColor: "white",
    borderWidth: 1,
  },
});
