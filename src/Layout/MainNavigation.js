import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../ReduxStore/Auth";

import classes from './MainNavigation.module.css';
//import { useContext } from 'react';
//import AuthContext from '../Store/auth-context';


const MainNavigation = () => {
  //const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //const isLoggedIn = authCtx.isLoggedIn
  const logoutHandler = () => {
    //authCtx.logout()
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
    
      
        <div className={classes.logo}>Expense Tracker</div>
    
      <nav>
        <ul>
          {!isLoggedIn &&  (<li>
            <Link to='/login'>Login</Link>
          </li>)}

          {isLoggedIn && (<li>
            <Link to='/expenses'>Expenses</Link>
          </li>)}
         
          {isLoggedIn && (<li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}

          
        </ul>
      </nav>
    
    </header>
  );
};

export default MainNavigation;
