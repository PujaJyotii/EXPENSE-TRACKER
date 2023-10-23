import axios from "axios";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

const ForgotPassword = () =>{
    const [mail, setmail] = useState("");
  const [loader, setloader] = useState(false);
  async function ForgetPasswordHandler() {
    setloader(true);
    let response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc",
      {
        requestType: "PASSWORD_RESET",
        email: mail,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
    setloader(false);
  }
return (
    <>
    <div className="d-flex justify-content-center align-items-center h-100">
        <Card border="primary" style={{ width: '25rem'}} className="mb-4 mt-4" >
            <Card.Body>
      <Form>
        <h1>Forgot Password</h1>
        <Form.Group className="mb-3" controlId="formForgotPasswordEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                setmail(e.target.value);
              }} value={mail}/>
        </Form.Group>
        {loader ? (
            <h4>loading data...</h4>
          ) : (
        <Button variant="primary" type="submit" onClick={ForgetPasswordHandler}>
          Reset Password
        </Button>)}

        
      </Form>
      <Link to={"/login"}>Already a user login? Login</Link>
      </Card.Body>
      </Card>
    </div>
    
    </>
)
}

export default ForgotPassword

