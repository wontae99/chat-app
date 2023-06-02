import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useChatContext } from "stream-chat-expo";

import Colors from "../constants/Colors";
import EtcProfileContent from "../components/etc/EtcProfileContent";
import Card from "../components/ui/Card";
import Spinner from "react-native-loading-spinner-overlay";

export default function EtcScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState();

  const authCtx = useContext(AuthContext);
  const { client } = useChatContext();

  async function fetchUserData() {
    const { users } = await client.queryUsers({ id: authCtx.token.localId });

    setUserData(...users);
    setLoading(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("EditProfile", { userData });
          }}
          style={{ paddingHorizontal: 15 }}
        >
          <Text style={{ color: "#ccc" }}>Edit Profile</Text>
        </Pressable>
      ),
    });
  }, [userData]);

  useEffect(() => {
    fetchUserData();
  }, [loading, navigation, authCtx]);

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1, width: "100%", padding: 14 }}>
        <Card backgroundColor={Colors.dark.darkPrimary200}>
          {loading || !userData ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator color="#fff" size={"large"} />
            </View>
          ) : (
            <EtcProfileContent
              userData={userData}
              editing={false}
              onPress={() => authCtx.logout()}
              name={userData.name}
              email={userData.email}
            />
          )}
        </Card>
      </View>
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
