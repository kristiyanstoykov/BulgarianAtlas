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
    height: 200,
    resizeMode: "cover",
    marginBottom: SIZES.xSmall,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  siteName: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    fontWeight: "bold",
    color: COLORS.tertiary,
    marginBottom: SIZES.xSmall,
  },
  siteText: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.black,
  },
});

export default styles;
