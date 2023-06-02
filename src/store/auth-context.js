import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  members: {},
  getMembers: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [members, setMembers] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", JSON.stringify(token));
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  function getMembers(channel) {
    setMembers(channel);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
    members,
    getMembers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
