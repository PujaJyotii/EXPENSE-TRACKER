
import React, { useContext } from "react";
import {  Redirect, Route, Switch  } from "react-router-dom";
import LogInSignUp from "./Component/LogInSignUp";
import Welcome from "./Component/Welcome";
import AuthContext from "./Store/auth-context";
import Layout from "./Layout/Layout";
import StartingPage from "./StartingPage/StartingPage";
import ProfilePage from "./Component/ProfilePage";




function App() {
 const authCtx =useContext(AuthContext)
 


  return (
    <Layout>
      
        <Switch>
      
      
        {  !authCtx.isLoggedIn  && <Route path='/' exact>
          <StartingPage />
        </Route>}
        {!authCtx.isLoggedIn && (<Route path='/login'>
          <LogInSignUp />
        </Route>)}


      {authCtx.isLoggedIn && (<Route path='/welcome' >  <Welcome /> </Route>) }
      {authCtx.isLoggedIn && (<Route path='/profile'><ProfilePage /></Route>)}
<Route path='*'>
  <Redirect to='/' />
</Route>

      

      </Switch>
    
    </Layout>
  );
}

export default App
