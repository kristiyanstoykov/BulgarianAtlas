const COLORS = {
  primary: "#9AADBF",
  secondary: "#000077",
  tertiary: "#6D98BA",
  quaternary: "#EEEEEE",
  warning: "#6D071A",

  primary2: "#312651",
  secondary2: "#444262",
  tertiary2: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

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
