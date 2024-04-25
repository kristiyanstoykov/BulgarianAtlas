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
    borderRadius: SIZES.xSmall,
  },
  postTitle: {
    fontFamily: FONT.bold,
    fontWeight: "bold",
    fontSize: SIZES.large,
    paddingVertical: SIZES.small,
  },
  btnMaps: {
    backgroundColor: COLORS.primary2.light,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: SIZES.xSmall,
    padding: SIZES.xSmall,
    borderRadius: 5,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary.dark,
  },
  btnMapsText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  contentText: {
    paddingVertical: SIZES.small,

    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
});
