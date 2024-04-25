import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    backgroundColor: name === activeTab ? COLORS.secondary2.default : COLORS.primary.light,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary.dark,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.medium - 2,
    color: name === activeTab ? COLORS.white : COLORS.gray.dark,
  }),
});

export default styles;
