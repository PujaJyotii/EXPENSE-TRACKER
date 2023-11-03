
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const AuthContext = React.createContext({
  
  
    name:'',
    photourl:'',
    
});

 export const AuthContextProvider = (props) => {
    
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
      const [name, setname] = useState("");
      
      const [photourl, setphotourl] = useState("");
    
    
     
      
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

        if (isLoggedIn) {
          getProfileApi();
        }
      }, [token,isLoggedIn]);
      
       
         
        
      
    
    const contextValue = {
        
        name: name,
    
    photourl: photourl,
    
  
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  }
export default AuthContext;