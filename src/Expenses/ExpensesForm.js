import { useState } from "react"
import { Button, Card, Dropdown, DropdownButton, Form } from "react-bootstrap"
import classes from './ExpensesForm.module.css'

const ExpensesForm = ( ) => {
    const [expense,setExpenses] = useState('');
    const [description, setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [data,storedata]=useState([])
    
    const SubmitHandler = (event) => {
       event.preventDefault() 
       if(expense.trim().length === 0 || description.trim().length === 0 || category.trim().length === 0)
       {
        return
       }
       const obj = {
        expense :expense,
        description : description,
        category : category
       }

       storedata((prev) => {
        return [...prev, obj];
      });

      setExpenses('');
      setDescription('');
      setCategory("Select Category")
    }


    return (
      <>
        <div className="d-flex justify-content-center align-items-center h-100">
        
        <Card border="primary" style={{ width: '25rem'}} className="mb-4 mt-4" >
            <Card.Body>
    <Form onSubmit={SubmitHandler}>
    <h2>Daily Expenses</h2>
    <Form.Group className="mb-3" controlId="formBasicExpenses">
                <Form.Label>Expenses</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Expenses"
              onChange={(e) => {
                setExpenses(e.target.value)
              }}
              value={expense}
                />

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={(e) => {
            setDescription(e.target.value)
        }} value={description} />
      </Form.Group>

    
              
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <DropdownButton
              id="dropdown-basic-button"
              title={category || "Select Category"}
              onSelect={(eventKey) => {
                setCategory(eventKey);
              }}
              value={category}
            >
              <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
              <Dropdown.Item eventKey="Petrol">Petrol</Dropdown.Item>
              <Dropdown.Item eventKey="Salary">Salary</Dropdown.Item>
            </DropdownButton>
        
      </Form.Group>

            

      
      
      <Button variant="primary" type="submit" className="mb-3">
      Add Expenses
      </Button>
    
    
   
    </Form>
    </Card.Body>
    </Card>
</div>
<Card className={classes.users}>
<ul>
    {data.map((item) => (
      <div key={item.description}>
        <li>Money: {item.expense} -
        Description: {item.description}-
        Catogary: {item.category}</li>
      </div>
    ))}
    </ul>
    </Card>
    </>
         
    )
}

export default ExpensesForm