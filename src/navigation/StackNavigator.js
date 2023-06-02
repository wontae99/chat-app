import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { openDrawer } from "../../App";
import IconButton from "../components/ui/IconButton";
import ChannelScreen from "../screens/ChannelScreen";
import NewChannelScreen from "../screens/NewChannelScreen";
import AddUserScreen from "../screens/AddUserScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ChannelDrawerContent from "../components/channel/ChannelDrawerContent";

import { AuthContext } from "../store/auth-context";
import { useWindowDimensions } from "react-native";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const ChannelDrawer = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const channel = route.params;

  const authCtx = useContext(AuthContext);
  const membersData = channel.channel.state.members;

  let memberArray = [];
  for (let key in membersData) {
    if (key !== authCtx.token.localId) {
      memberArray.push(membersData[key]["user"]["name"]);
    }
  }

  let title;
  title =
    memberArray.length === 1
      ? memberArray[0]
      : `${memberArray[0]} & ${memberArray.length - 1} member(s)`;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <ChannelDrawerContent {...props} membersData={membersData} />
      )}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        swipeEnabled: true,
        swipeEdgeWidth: width / 2,
        drawerType: "back",
      }}
    >
      <Drawer.Screen
        name="ChannelDrawer"
        component={ChannelScreen}
        initialParams={channel}
        options={{
          title: title,
          presentation: "modal",
          headerShown: true,
          headerRight: () => (
            <IconButton
              color={"#ccc"}
              icon="menu"
              onPress={() => openDrawer()}
              btnStyle={{ marginRight: 16 }}
            />
          ),
          headerLeft: () => (
            <IconButton
              color="#ccc"
              icon="chevron-back-sharp"
              onPress={() => navigation.goBack()}
              btnStyle={{ marginLeft: 16 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Channel"
        component={ChannelDrawer}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="NewChannel"
        component={NewChannelScreen}
        options={{ title: "Create DM", presentation: "modal" }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{ title: "Add Friend", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
