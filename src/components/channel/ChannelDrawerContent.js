import { Text } from "react-native";

import UserList from "../user/UserList";

export default function ChannelDrawerContent({ membersData }) {
  const members = [];
  for (let key in membersData) {
    members.push(membersData[key]["user"]);
  }

  return (
    // show user list to invite
    <>
      <Text
        style={{ fontSize: 18, fontWeight: "bold", margin: 14, color: "#ccc" }}
      >
        Members
      </Text>
      <UserList data={members} onPress={() => {}} />
    </>
  );
}
