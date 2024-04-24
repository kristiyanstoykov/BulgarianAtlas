import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  scrollViewContainer: {
    padding: SIZES.medium,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  postTitle: {
    fontFamily: FONT.bold,
    fontWeight: "bold",
    fontSize: SIZES.large,
    paddingVertical: SIZES.small,
  },
  btnMaps: {
    backgroundColor: COLORS.secondary.default,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 5,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary.dark,
  },
  btnMapsText: {
    color: COLORS.white,
  },
  contentText: {
    paddingVertical: SIZES.small,

    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
});
