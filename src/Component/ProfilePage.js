
import {  useState } from "react";
import { Button, Card, Form } from "react-bootstrap"
//import AuthContext from "../Store/auth-context";
import { useSelector } from "react-redux";

const ProfilePage = () => 
{
  //const authCtx = useContext(AuthContext)
  const token = useSelector((state) => state.auth.token);
    const [name, setName] = useState("")
    const [url, seturl] = useState("");

    const SubmitHandler = async (e) => {
      e.preventDefault();
      if(name.length > 0 && url.length > 0)
      {
     CallUpdateProfile()
      }
    }
      async function CallUpdateProfile() {
        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjMiC92hLxLJ4egzjmzxaS6D2OFbukiMc",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              displayName : name,
              photoUrl : url,
              returnSecureToken: false,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);

        } else {
          let data = await response.json();
          console.log(data);
        }
      }
      

  

return (
    <div className="d-flex justify-content-center align-items-center h-100">
        
        <Card border="primary" style={{ width: '25rem'}} className="mb-4 mt-4" >
            <Card.Body>
    <Form onSubmit={SubmitHandler}>
        <h3>Update Info</h3>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Name" onChange={(e) => {
          setName(e.target.value)
        }} value={
              name
              }/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMobile">
        <Form.Label>Profile Photo</Form.Label>
        <Form.Control type="url" placeholder="Enter Url" onChange={(e) => {
        seturl(e.target.value);
      }}
        value={
          url
        }/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
    </Card.Body>
    </Card>
</div>
)
}
export default ProfilePage