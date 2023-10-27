import { Link } from "react-router-dom"
import classes from './Welcome.module.css'
import {  useState } from "react";
//import AuthContext from "../Store/auth-context";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Welcome = () => {

const [err,seterr]=useState(false)
const token = useSelector((state) => state.auth.token);
   //const authCtx = useContext(AuthContext)
    async function verifyEmailfun() {
        try {
          const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc",
            {
              requestType: "VERIFY_EMAIL",
              idToken: token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.status === 200) {
            console.log(response.data);
            seterr(true);
          } else {
            console.error("Error:", response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
return (
    <>
    {err && <Alert variant="success">User is Varified now</Alert>}
    <div className={classes.container}>
    <h1 className={classes.h1}>Welcome to Expense Tracker</h1>
    <h3 className={classes.h3}>your profile is incomplete</h3><br></br>
  
  <Link to='/profile'
    className={classes.Link}>Complete</Link> 
    
    <div className="mt-5">
          <h3>Verify Email: </h3>
          <Button variant="primary" type="submit" onClick={verifyEmailfun}>
            Verify Email
          </Button>
        </div>
        </div>
    </>
)
}

export default Welcome