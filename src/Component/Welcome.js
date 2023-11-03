import { Link } from "react-router-dom"
import classes from './Welcome.module.css'
import {  useContext, useState } from "react";
import AuthContext from "../Store/auth-context";
import axios from "axios";
import { Alert, Button, Form } from "react-bootstrap";
import {  useDispatch, useSelector } from "react-redux";
import { themeActions } from "../StartingPage/Dashboard";


const Welcome = () => {

const [err,seterr]=useState(false)
const [premium, setpremium] = useState(false);
const dispatch = useDispatch()

const token = useSelector((state) => state.auth.token);
const toggle = useSelector((state) => state.theme.toggle);

   const authCtx = useContext(AuthContext)
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
      function changetoggle() {
        dispatch(themeActions.changeTheme());
        setpremium(true)
      }
      
return (
    
     <div id={toggle ? "dark" : ""}>
    {err && <Alert variant="success">User is Verified now</Alert>}
    <div className={classes.container}>
    <h1 className={classes.h1}>Welcome to Expense Tracker</h1>
    <h3 className={classes.h3}>your profile is {''}
    {authCtx.name !== undefined ? "complete" : " incomplete"}</h3><br></br>
    {authCtx.name !== undefined ? <Link to='/profile'
    className={classes.Link}>Edit</Link> : <Link to='/profile'
    className={classes.Link}>Complete</Link> }

    
    <div className="mt-5">
          <h3>Verify Email: </h3>
          <Button variant="primary" type="submit" onClick={verifyEmailfun}>
            Verify Email
          </Button>
          {premium ? (
              <Form className="pt-3">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="light mode"
                  checked={toggle}
                  onChange={changetoggle}
                />
              </Form>
            ) : null}
         
        </div>
      </div>
      </div>
  
)
}

export default Welcome