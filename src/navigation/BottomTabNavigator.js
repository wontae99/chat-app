import { Pressable, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import ChannelListScreen from "../screens/ChannelListScreen";
import UserListScreen from "../screens/UserListScreen";
import EtcScreen from "../screens/EtcScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EtcStack = ({ navigation }) => {
  return (
    <Stack.Navigator id="EtcStack" screenOptions={{ title: "See More" }}>
      <Stack.Screen name="Etc" component={EtcScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          presentation: "transparentModal",
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Etc");
              }}
              style={{ paddingHorizontal: 20 }}
            >
              <Text style={{ color: "#ccc" }}>Cancel</Text>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default function BottomTabNavigator({ navigation }) {
  return (
    <BottomTab.Navigator
      id="BottomTab"
      screenOptions={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
    >
      <BottomTab.Screen
        name="UserListScreen"
        component={UserListScreen}
        options={{
          title: "User List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ChannelListScreen"
        component={ChannelListScreen}
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="EtcScreen"
        component={EtcStack}
        options={{
          title: "See More",
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
