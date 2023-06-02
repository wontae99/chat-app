import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../ui/PrimaryButton";
import ProfileImage from "./ProfileImage";

export default function EtcProfileContent({
  userData,
  editing,
  setMode,
  onPress,
  name,
  email,
  setModalVisible,
}) {
  const editIcon = <Ionicons name="pencil" color="#ccc" size={18} />;
  return (
    <>
      <View style={styles.mainProfile}>
        <ProfileImage editing={editing} initialImg={userData.image} />
        <Pressable
          disabled={!editing}
          style={[
            { flex: 1, paddingLeft: 12 },
            styles.textBox,
            editing && styles.editing,
          ]}
          onPress={() => {
            setMode("username");
            setModalVisible(true);
          }}
        >
          <Text style={[styles.username]}>{name}</Text>
          {editing && editIcon}
        </Pressable>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.subtitle}>E-mail</Text>
        <Pressable
          style={[styles.textBox, editing && styles.editing]}
          disabled={!editing}
          onPress={() => {
            setMode("email");
            setModalVisible(true);
          }}
        >
          <Text style={[styles.email]}>{email}</Text>
          {editing && editIcon}
        </Pressable>
      </View>
      {editing ? (
        <PrimaryButton
          text="Submit"
          onPress={onPress}
          backgroundColor="#2196F3"
        />
      ) : (
        <PrimaryButton text={"Log Out"} onPress={onPress} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ccc",
  },
  
  editing: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  username: {
    color: "white",
    fontSize: 28,
    fontWeight: "600",
  },
  email: {
    fontSize: 22,
    fontWeight: "500",
    color: "white",
  },
  emailContainer: {
    paddingVertical: 20,
  },
});
