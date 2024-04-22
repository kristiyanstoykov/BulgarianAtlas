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
    fontSize: 18,
  },
  activeText: {
    fontWeight: "bold",
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
  },
  button: {
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: COLORS.tertiary,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
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
