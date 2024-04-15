import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large,
    marginBottom: SIZES.xLarge,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.tertiary,
  },
  image: {
    width: "100%",
    height: 200, // Fixed height for images
    resizeMode: "cover",
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  siteName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.tertiary,
  },
  siteText: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.black,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;
