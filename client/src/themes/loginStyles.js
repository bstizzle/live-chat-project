import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  imgOver: {
    textAlign: "center",
  },
  input: {
    padding: "10px"
  },
  sideTxt: {
    color: "white",
  },
  header: {
    paddingTop: "50px",
  },
  headerTxt: {
    paddingTop: "25px", 
    color: "#C0C0C0"
  },
  formContainer: {
    margin: "0px 150px 0px 150px"
  },
  formHeader: {
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: "40px"
  },
  paper: {
    textAlign: "center",  
  },
  routeBtn: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.40)",
    width: "200px",
    height: "80px",
    color:"#3A8DFF"
  },
  submitBtn: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.40)",
    width: "200px",
    height: "80px",
  },
  btnContainer: {
    paddingTop: '40px'
  },
  sidebar: {
    backgroundImage: "linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 1)), var(--img)",
    width: "80%",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center"
  }
}))