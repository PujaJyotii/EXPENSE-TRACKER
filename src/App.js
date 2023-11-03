
import React from "react";
import { Redirect   ,Route, Switch  } from "react-router-dom";
import LogInSignUp from "./Component/LogInSignUp";

import Layout from "./Layout/Layout";
import StartingPage from "./StartingPage/StartingPage";
import ProfilePage from "./Component/ProfilePage";
import ForgotPassword from "./Component/ForgotPassword";
import ExpensesForm from "./Expenses/ExpensesForm";
import { useSelector } from "react-redux";
import Welcome from "./Component/Welcome";





function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 


  return (
    <Layout>
      
        <Switch>
      
      
        {  !isLoggedIn  && <Route path='/' exact>
          <StartingPage />
        </Route>}
        {!isLoggedIn && (<Route path='/login'>
          <LogInSignUp />
        </Route>)}
        {!isLoggedIn && (<Route path='/forgotPassword'>
          <ForgotPassword />
        </Route>)}
        
      
      {isLoggedIn && (<Route path='/profile'><ProfilePage /></Route>)}
      {isLoggedIn && (<Route path='/expenses'><ExpensesForm /></Route>)}
      { isLoggedIn && (<Route path='/welcome'><Welcome /></Route>)}
     {isLoggedIn && (<Route path='/'><Welcome /></Route>)}


   
        
      
    
    
       
<Route path='*'>
  <Redirect to='/'/>
</Route>

 
      
              
              
      
            
          
      

           


      </Switch>
    
    </Layout>
  );
}

export default App
