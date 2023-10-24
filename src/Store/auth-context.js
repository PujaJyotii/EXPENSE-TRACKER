import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    email:'',
    name:'',
    photourl:'',
    expensedata:[],
    addExpenses:(item)=> {},
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
      const [expensedata, setexpensedata] = useState([]);
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

      useEffect(() => {
        async function getExpensedata() {
          let response = await axios.get(
            "https://react-expense-tracker-ad68f-default-rtdb.firebaseio.com/expense.json"
          );
          if (response.status === 200) {
            response = response.data;
            let expensearr = [];
            for (const key in response) {
              expensearr.push({
                id: key,
                catogary: response[key].category,
                description: response[key].description,
                expense: response[key].expense,
              });
            }
            setexpensedata(expensearr);
          } else {
            console.log("err", response);
          }
        }
        getExpensedata();
      }, []);
    
      async function addExpenseHandler(expense, description, category) {
        let response = await axios.post(
          "https://react-expense-tracker-ad68f-default-rtdb.firebaseio.com/expense.json",
          {
            expense,
            description,
            category,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          let dataArr = { category, description, expense, id: response.data.name };
          setexpensedata((prev) => {
            return [...prev, dataArr];
          });
        } else {
          console.log("Error:" + response.data);
        }
      }
    
    const contextValue = {
        token:token,
        name: name,
    email: email,
    photourl: photourl,
    expensedata:expensedata,
    addExpenses:addExpenseHandler,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}


export default AuthContext;