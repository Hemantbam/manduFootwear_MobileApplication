import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ContainerBox: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerBox: {
    backgroundColor: "#FFD160",
    height: 200,
    width: "100%",
    borderRadius: 20,
  },
  bodyBox: {
    position: "relative",
    marginVertical: -30,
    height: 478,
    width: 348,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    zIndex: 2,
    alignItems: "center",
  },
  backgroundBoxShadow: {
    position: "absolute",
    borderRadius: 10,
    height: 478,
    width: 348,
    marginVertical: -30,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    zIndex: 0,
    top: -7,
    left: -7,
  },
  bodyHeadingText: {
    fontWeight: 900,
    fontFamily: "Monda",
    fontSize: 15,
    textAlign: "center",
    top: 10,
  },
  logInInputs: {
    top: 50,
    gap: 20,
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
    left: 10,
  },
  inputFields: {
    flexDirection: "row",
    gap: 50,
    textAlign: "center",
    alignItems: "center",
    height: 40,
    width: 287,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
  textInputStyle: {
    width: 200,
    height:35,

  },
  forgetText: {
    top: -10,
    textAlign: "right",
    left: 90,
    color: "#645F5F",
  },
  bottomContent: {
    top: 70,
  },
  loginBtn: {
    width: 144,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FFD471",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  loginText: {
    fontWeight: 800,
  },
  socialLink: {
    alignItems: "center",
  },

  socialLoginOptions: {
    textAlign: "center",
    top: 5,
    color: "#645F5F",
    fontWeight: 700,
  },
  socialImages: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    top: 10,
  },
  signInTextOne: {
    color: "#AB9E9E",
    top: 30,
  },
  signInTextTwo: {
    color: "black",
    fontWeight: 800,
    top: 30,
  },
  createAccount: {
    flexDirection: "row",
  },
});
