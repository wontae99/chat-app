import { useContext } from "react";
import { Text, View, StyleSheet, LogBox } from "react-native";
import { useRoute } from "@react-navigation/native";

import { AuthContext } from "../store/auth-context";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import Colors from "../constants/Colors";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function ChannelScreen() {
  const route = useRoute();

  const authCtx = useContext(AuthContext);

  const channel = route.params?.channel;
  const membersData = channel.state.members;

  const members = [];
  for (let key in membersData) {
    if (key !== authCtx.token.localId) {
      members.push(membersData[key]["user"]["name"]);
    }
  }

  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Select a channel from the list!</Text>
      </View>
    );
  }

  const DateHeader = ({ dateString }) => (
    <Text style={{ color: "#ccc" }}>{dateString}</Text>
  );

  return (
    <Channel DateHeader={DateHeader} channel={channel} key={channel.data.id}>
      <View style={{ flex: 1, backgroundColor: Colors.dark.darkPrimary }}>
        <MessageList />
        <MessageInput />
      </View>
    </Channel>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    fontSize: 16,
  },
  btnStyle: {
    marginRight: 16,
  },
});
