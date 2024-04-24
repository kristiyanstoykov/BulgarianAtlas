import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

export default StyleSheet.create({
  container: {
    padding: SIZES.medium,
  },
  alignRight: {
    justifyContent: "flex-end",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnLogout: {
    backgroundColor: COLORS.warning.light,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogoutText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
  },
  btnAddPost: {
    backgroundColor: COLORS.primary2.light,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddPostText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});
