
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/Auth";



import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import { useContext } from 'react';
//import AuthContext from '../Store/auth-context';


const MainNavigation = () => {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const toggle = useSelector((state) => state.theme.toggle);
  //const isLoggedIn = authCtx.isLoggedIn
  const logoutHandler = () => {
    //authCtx.logout()
    dispatch(authActions.logout());
  }

  return (
    
    
         
          
    <div id="dark">
    <Navbar
      expand="lg"
      bg={toggle ? "dark" : "light"}
      variant={toggle ? "dark" : "light"} 
    >
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
              <Link  style={{ marginRight: '20px' }} to="/welcome">Welcome</Link>
                <Link style={{ marginRight: '20px' }} to="/expenses">Expenses</Link>
                <Button variant="primary" type="submit" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
    
  );
};

export default MainNavigation;
