import { useEffect, useState } from "react"
import { Button, Card ,Dropdown, DropdownButton, Form } from "react-bootstrap"
import classes from './ExpensesForm.module.css'
import { useSelector, useDispatch } from "react-redux";
import {
  getallExpense,
  addExpense,
  deleteExpense,
  editExpense,
} from "../ReduxStore/Expensedata";

//import AuthContext from "../Store/auth-context"

const ExpensesForm = ( ) => {
  //const authCtx = useContext(AuthContext)
    const [expense,setExpenses] = useState('');
    const [description, setDescription] = useState('');
    const [category,setCategory] = useState('');
    const data = useSelector((state) => state.expensedata.data);
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getallExpense());
    }, [dispatch]);
    
    const SubmitHandler = (event) => {
       event.preventDefault() 
       if(expense.length === 0 || description.length === 0 || category.length === 0)
       {
        return
       }
    

       dispatch(addExpense({ expense, description, category }));

      setExpenses('');
      setDescription('');
      setCategory("")
    }
    function itemshowonForm(item) {
      setExpenses(item.expense);
      setDescription(item.description);
      setCategory(item.category);
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
        <li>Money: Rs.{item.expense} -
        Description: {item.description}-
        Category: {item.category}
        {item.expense > 10000 ? (
            <Button variant="warning" className="m-2">
              Active Premium Button
            </Button>
          ) : null}
        </li><Button
            variant="danger"
            onClick={() => {
              dispatch(deleteExpense(item.id));;
            }}
            className="m-2"
          >
            Delete
          </Button>
          <Button
            variant="success"
            onClick={() => {
              itemshowonForm(item);
            }}
            className="m-2"
          >
            ItemShowonForm
          </Button>
          <Button
            variant="success"
            onClick={() => {
              let id = item.id;
              dispatch(editExpense({ expense, description, category, id }));
            }}
            className="m-2"
          >
            Edit form data
          </Button>
      </div>
    ))}
    
    </ul>
    </Card>
    </>
         
    )
}

export default ExpensesForm