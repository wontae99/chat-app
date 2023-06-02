import { FlatList, View, StyleSheet } from "react-native";

import UserListItem from "./UserListItem";
import UserCheckBoxItem from "./UserCheckBoxItem";

export default function UserList({ data, onPress, isCheckBox }) {
  function renderUserItem(itemData) {
    const { item } = itemData;
    const itemProps = {
      id: item.id,
      name: item.name,
      image: item.image,
      online: item.online,
    };

    if (isCheckBox) {
      return <UserCheckBoxItem {...itemProps} onPress={onPress} />;
    }
    return <UserListItem {...itemProps} onPress={onPress} />;
  }

  if (!data) {
    return;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
