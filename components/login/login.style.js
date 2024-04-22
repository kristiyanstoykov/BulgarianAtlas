import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tabs: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  tabText: {
    color: COLORS.black,
    fontSize: SIZES.medium,
  },
  activeText: {
    fontWeight: FONT.bold,
  },
  underline: {
    padding: 1,
    paddingHorizontal: 30,
    backgroundColor: COLORS.black,
    marginTop: 1,
  },
  form: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a0b3b0",
    backgroundColor: COLORS.quaternary,
    color: "black",
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  forget: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText: {
    color: COLORS.white,
  },
  normalText: {
    color: COLORS.white,
    marginBottom: 20,
  },
});
