import { makeStyles } from "@material-ui/core/styles";
import bgImage from '../images/bg-img.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  imgOver: {
    textAlign: "center",
  },
  input: {
    padding: "5%"
  },
  sideTxt: {
    color: "white",
  },
  header: {
    paddingTop: "50px",
    paddingRight: "5%"
  },
  headerTxt: {
    paddingTop: "25px", 
    color: "#C0C0C0"
  },
  formContainer: {
    margin: "0% 15% 0% 15%"
  },
  formHeader: {
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: "5%"
  },
  paper: {
    textAlign: "center",  
  },
  routeBtn: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.40)",
    width: "200px",
    height: "80px",
    color:"#3A8DFF",
  },
  rtBtnContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  submitBtn: {
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.40)",
    width: "200px",
    height: "80px",
  },
  subBtnContainer: {
    paddingTop: "40px"
  },
  sidebar: {
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 1)), url(${bgImage})`,
    width: "80%",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center"
  }
}))