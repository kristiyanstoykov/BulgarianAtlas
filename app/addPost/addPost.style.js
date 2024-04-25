import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const btnCircleStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
};

export default StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.white,
  },
  image: {
    width: 300,
    height: 225,
    borderRadius: 10,
  },
  imageContainer: {
    paddingTop: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
  },

  cameraBtnContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: SIZES.small,
  },
  cameraButton: {
    backgroundColor: COLORS.primary2.light,
    ...btnCircleStyle,
    marginRight: 10,
  },
  cameraButtonText: {
    backgroundColor: COLORS.primary2.light,
    ...btnCircleStyle,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: SIZES.small,
  },

  input: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.gray2.default,
  },

  mapsContainer: {
    paddingBottom: 20,
  },
  mapView: {
    width: "100%",
    height: 400,
  },
  addPost: {
    backgroundColor: COLORS.primary2.light,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    ...SHADOWS.medium,
    shadowColor: COLORS.primary2.dark,
  },
  addPostText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});
