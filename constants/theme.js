const COLORS = {
  primary: {
    default: "#9AADBF",
    light: "#D9E2EC",
    dark: "#3C4C5A",
  },
  secondary: {
    default: "#000077",
    light: "#0000FF",
    dark: "#000033",
  },
  tertiary: {
    default: "#6D98BA",
    light: "#99C2E0",
    dark: "#3F6B8C",
  },
  quaternary: {
    default: "#EEEEEE",
    light: "#F5F5F5",
    dark: "#D6D6D6",
  },
  warning: {
    default: "#6D071A",
    light: "#A50F2A",
    dark: "#4A0A16",
  },
  success: {
    default: "#007E33",
    light: "#00C853",
    dark: "#005005",
  },
  primary2: {
    default: "#312651",
    light: "#4D3D6B",
    dark: "#1F1A3A",
  },
  secondary2: {
    default: "#444262",
    light: "#646482",
    dark: "#2D2B3A",
  },
  tertiary2: {
    default: "#FF7754",
    light: "#FF9E8A",
    dark: "#D65D3F",
  },
  gray: {
    default: "#83829A",
    light: "#A8A7B8",
    dark: "#5E5D6B",
  },
  gray2: {
    default: "#C1C0C8",
    light: "#DAD9DF",
    dark: "#A8A7AF",
  },
  black: "#000000",
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "PoppinsRegular",
  medium: "PoppinsMedium",
  bold: "PoppinsBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SHADOWS, SIZES };
