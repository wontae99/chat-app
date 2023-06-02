import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import IconButton from "../components/ui/IconButton";
import { useChatContext } from "stream-chat-expo";
import { AuthContext } from "../store/auth-context";
import UserList from "../components/user/UserList";

export default function UserListScreen({ navigation }) {
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

  function onPressAddUser() {
    navigation.navigate("AddUser");
  }

  const startChannel = async (id) => {
    const channel = client.channel("messaging", {
      members: [userId, id],
    });
    await channel.create();

    navigation.navigate("Channel", { channel });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            color="#ccc"
            icon="person-add"
            btnStyle={styles.btnStyle}
            onPress={onPressAddUser}
          />
        );
      },
    });
  }, [navigation]);

  if (users.length === 0) {
    return;
  }

  return <UserList data={users} onPress={startChannel} />;
}

const styles = StyleSheet.create({
  btnStyle: {
    marginRight: 12,
  },
});
