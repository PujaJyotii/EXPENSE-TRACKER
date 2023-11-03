import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialAuthState = {
  data: [],
};

const expensedataSlice = createSlice({
  name: "expensedata",
  initialState: initialAuthState,
  reducers: {
    manipulateData(state, action) {
      //   state.data.push(action.payload);
      state.data = action.payload;
    },
  },
});
export const expensedataActions = expensedataSlice.actions;
export default expensedataSlice.reducer;

export function addExpense({ expense, description, category }) {
  return async function addExpenseThunk(dispatch, getState) {
    const state = getState();
    let data = state.expensedata.data;
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
      dispatch(expensedataActions.manipulateData([...data, dataArr]));
    } else {
      console.log("Error:" + response.data);
    }
  };
}
export function getallExpense() {
  return async function getallExpenseThunk(dispatch, getState) {
    let response = await axios.get(
      "https://react-expense-tracker-ad68f-default-rtdb.firebaseio.com/expense.json"
    );
    if (response.status === 200) {
      response = response.data;
      let expensearr = [];
      for (const key in response) {
        expensearr.push({
          id: key,
          expense: response[key].expense,

          description: response[key].description,
          category: response[key].category,

        });
      }
      dispatch(expensedataActions.manipulateData(expensearr));
    } else {
      console.log("err", response);
    }
  };
}
export function editExpense({ expense, description, category, id }) {
  return async function editExpenseThunk(dispatch, getState) {
    try {
      const state = getState();
      const copyexpensedata = [...state.expensedata.data];

      const expenseIndex = copyexpensedata.findIndex((val) => val.id === id);

      // Make a copy of the expense object
      const updatedExpense = { ...copyexpensedata[expenseIndex] };

      // Update the properties of the copied expense
      updatedExpense.expense = expense;
      updatedExpense.description = description;
      updatedExpense.category = category;

      // Update the copy of the data array
      copyexpensedata[expenseIndex] = updatedExpense;

      dispatch(expensedataActions.manipulateData(copyexpensedata));
      

      const response = await axios.put(
        `https://react-expense-tracker-ad68f-default-rtdb.firebaseio.com/expense/${id}.json`,
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
        console.log(response.data);
      } else {
        console.log("Error", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

export function deleteExpense(id) {
  return async function deleteExpenseThunk(dispatch, getState) {
    const state = getState();
    let copyexpensedata = [...state.expensedata.data];
    copyexpensedata = copyexpensedata.filter((val) => {
      return val.id !== id;
    });
    dispatch(expensedataActions.manipulateData(copyexpensedata));

    let response = await axios.delete(
      `https://react-expense-tracker-ad68f-default-rtdb.firebaseio.com/expense/${id}.json`
    );
    if (response.status === 200) {
      alert("successfully deleted");
    } else {
      console.log("Error", response.data);
    }
  };
}