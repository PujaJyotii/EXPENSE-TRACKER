import React, { useEffect } from "react";

import { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    email:'',
    name:'',
    photourl:'',
    isLoggedIn:false,
    login:(token) => {},
    logout:() => {},
});

 export const AuthContextProvider = (props) => {
    function getItemsFromLocalstorage() {
        let items = localStorage.getItem("token");
        if (!items) return;
        else {
          items = JSON.parse(items);
          return items;
        }
      }
      function getToken() {
        let itemToken = getItemsFromLocalstorage();
        if (!itemToken) {
          return "";
        } else {
          return itemToken.token;
        }
      }
      function getEmail() {
        let itemToken = getItemsFromLocalstorage();
        if (!itemToken) {
          return "";
        } else {
          return itemToken.email;
        }
      }
      const [token, setToken] = useState(getToken);
      const [email, setemail] = useState(getEmail);
      const [name, setname] = useState("");
      const [photourl, setphotourl] = useState("");
      const userIsLoggedIn = !!token;
    
      function loginHandler(tok, mail) {
        
        const obj = {
          token: tok,
          email: mail,
        };
        localStorage.setItem("token", JSON.stringify(obj));
        setToken(tok);
        setemail(mail);
      }
      
      useEffect(() => {
        async function getProfileApi() {
          try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc",
              {
                method: "POST",
                body: JSON.stringify({ idToken: token }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
    
            if (response.ok) {
              const data = await response.json();
              setname(data.users[0].displayName);
              setphotourl(data.users[0].photoUrl);
            } else {
              const errorData = await response.json();
              console.log("Error response:", errorData);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }
    
        if (userIsLoggedIn) {
          getProfileApi();
        }
      }, [token,userIsLoggedIn]);
      function logoutHandler() {
        setToken(null)
        setemail(null)
        
        localStorage.removeItem("token");
        
        
      }
    
    const contextValue = {
        token:token,
        name: name,
    email: email,
    photourl: photourl,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}


export default AuthContext;