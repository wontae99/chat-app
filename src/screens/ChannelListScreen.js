import { useContext, useLayoutEffect } from "react";
import { StyleSheet, LogBox, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatContext, ChannelList } from "stream-chat-expo";

import IconButton from "../components/ui/IconButton";
import { AuthContext } from "../store/auth-context";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function ChannelListScreen() {
  const { client } = useChatContext();
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();

  const onPressAddChannel = () => {
    navigation.navigate("NewChannel");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            color="#ccc"
            icon="add"
            onPress={onPressAddChannel}
            btnStyle={styles.btnStyle}
          />
        );
      },
    });
  }, [navigation]);

  async function selectChannelHandler(channel) {
    navigation.setParams({ channel });
    navigation.navigate("Channel", { channel });
  }

  const filter = {
    members: { $in: [authCtx.token.localId] },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ccc" }}>
      <ChannelList filters={filter} onSelect={selectChannelHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    marginRight: 12,
  },
});
