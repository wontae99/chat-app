import { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useChatContext } from "stream-chat-expo";

import { AuthContext } from "../store/auth-context";
import Colors from "../constants/Colors";
import EditProfileModal from "../components/etc/EditProfileModal";
import Card from "../components/ui/Card";
import EtcProfileContent from "../components/etc/EtcProfileContent";
import { changeEmail } from "../util/auth";

export default function EditProfileScreen({ route, navigation }) {
  const { userData } = route.params;
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState();

  const inputProps = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  };

  const { client } = useChatContext();
  const authCtx = useContext(AuthContext);

  async function confirmChangeHandler() {
    if (userData.name === name && userData.email === email) {
      Alert.alert("Check again!", "Nothing changed!");
      return;
    }
    setLoading(true);
    try {
      if (userData.email !== email) {
        const token = await changeEmail(authCtx.token.idToken, email);
        authCtx.authenticate(token);
      }

      await client.partialUpdateUser({
        id: authCtx.token.localId,
        set: {
          name,
          email,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
    navigation.navigate("Etc");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1, width: "100%", padding: 14 }}>
        <Card backgroundColor={Colors.dark.darkPrimary200}>
          {!loading ? (
            <EtcProfileContent
              name={name}
              email={email}
              userData={userData}
              editing={true}
              setMode={setMode}
              setModalVisible={setModalVisible}
              onPress={confirmChangeHandler}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color="#fff" size="large" />
            </View>
          )}
        </Card>
      </View>
      <EditProfileModal
        inputProps={inputProps}
        mode={mode}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.darkPrimary,
  },
});
