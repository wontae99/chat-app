const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

const Colors = {
  primary100: "#2196F3",
  primary200: "#5964E8",
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    darkPrimary: "#36393E",
    darkPrimary200: "#202225",
  },
};

export const navTheme = {
  colors: {
    primary: "#5964E8",
    background: "#36393E",
    card: "#202225",
    text: "#fff",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export const ChatTheme = {
  ChannelPreview: {
    container: {
      backgroundColor: Colors.dark.darkPrimary200,
    },
  },
  messageList: {
    container: {
      backgroundColor: Colors.dark.darkPrimary,
    },
  },
  messageInput: {
    container: {
      backgroundColor: Colors.dark.darkPrimary200,
    },
    sendButton: {
      color: Colors.primary100,
    },
  },
  inlineDateSeparator: {
    text: {
      color: "#ccc",
    },
  },
};

export const StreamColors = {
  accent_blue: "#005FFF",
  accent_green: "#20E070",
  accent_red: "#FF3742",
  bg_gradient_end: "#080808",
  bg_gradient_start: "#030303",
  black: "#ffffff",
  blue_alice: "#160D00",
  border: "#00000014", // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
  grey: "#858585",
  grey_gainsboro: "#242424",
  grey_whisper: "#131414",
  icon_background: "#000000",
  modal_shadow: "#ffffff99", // 99 = 60% opacity; x=0, y= 1, radius=4
  overlay: "#00000033", // 33 = 20% opacity
  overlay_dark: "#ffffff99", // 99 = 60% opacity
  shadow_icon: "#ffffff40", // 40 = 25% opacity; x=0, y=0, radius=4
  targetedMessageBackground: "#040B22", // dark mode = #302D22
  transparent: "transparent",
  white: "#36393E",
  white_smoke: "#121212",
  white_snow: "#121212",
};

export default Colors;
