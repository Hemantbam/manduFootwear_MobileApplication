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
    zIndex: 1,
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
    fontWeight: "bold",
    fontFamily: "Monda",
    fontSize: 15,
    textAlign: "center",
    top: 10,
    zIndex: 1,
    position: "sticky",
    backgroundColor: "white",
    width: "100%",
  },
  signUpInputs: {
    top: 40,
    gap: 0,
    alignItems: "center",
    width: "100%",
  },
  inputFields: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: 287,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 10,
  },
  textInputStyle: {
    height: 35,
    width: 280,
  },
  signUpFormLabel: {
    textAlign: "left",
    marginBottom: 5,
    width: "100%",
    paddingLeft: 2,
    fontWeight: "500",
  },
  scrollContainer: {
    paddingBottom: 70,
  },
  registerButtonContainer: {
    left: 100,
  },

  registerBtn: {
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
    top: 40,
  },
  registerText: {
    fontWeight: 800,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  
});
