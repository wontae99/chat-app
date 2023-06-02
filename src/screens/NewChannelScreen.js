import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-expo";

import { AuthContext } from "../store/auth-context";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import UserList from "../components/user/UserList";

export default function NewChannelScreen({ navigation }) {
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const [users, setUsers] = useState([]);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.token.localId;

  const { client } = useChatContext();

  async function fetchUser() {
    const data = await client.queryUsers({
      id: {
        $ne: userId,
      },
    });
    setUsers(data.users);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  function selectUserHandler(id) {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds((existingUserIds) =>
        existingUserIds.filter((userId) => userId !== id)
      );
    } else {
      setSelectedUserIds((existingUserIds) => [...existingUserIds, id]);
    }
  }

  const createDMHandler = async () => {
    const channel = client.channel("team", {
      members: [userId, ...selectedUserIds],
    });
    await channel.create();

    navigation.navigate("Channel", { channel });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select friends</Text>
      <Text style={styles.subtitle}>Invite your friends!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter friend's name or email"
        placeholderTextColor="#ccc"
      />
      <UserList data={users} isCheckBox={true} onPress={selectUserHandler} />
      <PrimaryButton text={"Create DM"} onPress={createDMHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.darkPrimary,
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 16,
    marginTop: 6,
  },
  input: {
    backgroundColor: Colors.dark.darkPrimary200,
    padding: 12,
    marginVertical: 12,
    color: "white",
    borderRadius: 5,
  },
});
