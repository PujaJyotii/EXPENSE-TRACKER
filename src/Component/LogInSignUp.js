import { useContext } from "react";
import { useRef, useState } from "react";
import {  Alert, Button, Card, Form } from "react-bootstrap"
import AuthContext from "../Store/auth-context"
import { Link, useHistory } from "react-router-dom";



const LogInSignUp = () => {
     const enteredEmailRef = useRef();
     const enteredPasswordRef = useRef()
     const enteredPasswordConfirmRef =useRef()
     

const authCtx = useContext(AuthContext)
const history = useHistory()
 



    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      };

      const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = enteredEmailRef.current ? enteredEmailRef.current.value : '';
        const enteredPassword = enteredPasswordRef.current ? enteredPasswordRef.current.value : '';
        const enteredPasswordConfirm = enteredPasswordConfirmRef.current ? enteredPasswordConfirmRef.current.value : '';
        let url;
        if(isLogin)
        {
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc'
        }
        else{
            if(enteredPassword === enteredPasswordConfirm)
            {
                url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc'
            }
            
              else
              {
                  setError("Passwords do not match");
          return;
              }
            
            
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:'true'}),
            headers:{'Content-Type': 'application/json'
          }
            
          }).then(res => {
            if(res.ok){
               return res.json()
            }
            else{
              return res.json().then((data) => {
                let errMessage='Authentication Failed';
                /*if(data && data.error && data.error.message)
                {
                  errMessage=data.error.message
                }*/
                throw new Error(errMessage)
              })
            }
          }).then( (data) => {
            authCtx.login(data.idToken ,data.email)
            
      history.replace('/welcome')

      
            
          }).catch((err) => {
            alert(err.message)
          })
      }

return(
    <div className="d-flex justify-content-center align-items-center h-100">
        
        <Card border="primary" style={{ width: '25rem'}} className="mb-4 mt-4" >
            <Card.Body>
    <Form onSubmit={submitHandler}>
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={enteredEmailRef}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={enteredPasswordRef}/>
      </Form.Group>

      {!isLogin && (
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={enteredPasswordConfirmRef}
                />
              </Form.Group>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

      
      
      <Button variant="primary" type="submit" className="mb-2">
      {isLogin ? 'Login' : 'Create Account'}
      </Button><br></br>
      <Button
    
    variant="primary"
      onClick={switchAuthModeHandler}>
        {isLogin ? 'Create new account' : 'Login with existing account'}
        </Button> 

       {isLogin && <Button
              variant="link">
                <Link to="/forgotPassword">Forgot Password?</Link>
              
            </Button>}
    </Form>
    </Card.Body>
    </Card>
</div>
    
        
    
)

}

export default LogInSignUp 