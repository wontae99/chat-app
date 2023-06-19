import { useContext, useEffect, createRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

import { StreamColors, navTheme, ChatTheme } from "./src/constants/Colors";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import useCachedResources from "./src/hooks/useCachedResources";
import AuthContextProvider, { AuthContext } from "./src/store/auth-context";
import AuthNavigator from "./src/navigation/AuthNavigator";
import StackNavigator from "./src/navigation/StackNavigator";

import CHAT_API from "@env"

const API_KEY = CHAT_API;
const client = StreamChat.getInstance(API_KEY);

const theme = {
  colors: StreamColors,
  ...ChatTheme,
};

export const navigationRef = createRef();

export function openDrawer(routeName, params) {
  navigationRef.current.dispatch(DrawerActions.openDrawer());
}

function Root() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        const token = JSON.parse(storedToken);
        authCtx.authenticate(token);

        await client.connectUser(
          {
            id: token.localId,
            email: token.email,
          },
          client.devToken(token.localId)
        );
      }
    }

    fetchToken();

    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      {!authCtx.isAuthenticated && <AuthNavigator />}
      {authCtx.isAuthenticated && <StackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <AuthContextProvider>
            <OverlayProvider value={{ style: theme }}>
              <Chat client={client}>
                <Root />
              </Chat>
            </OverlayProvider>
          </AuthContextProvider>
        </SafeAreaProvider>
      </>
    );
  }
}
