import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import ExpenseDataReducer from "./ExpenseData";
import ThemeReducer from '../StartingPage/Dashboard'
const store = configureStore({
  reducer: { auth: authReducer, expensedata: ExpenseDataReducer,
  theme : ThemeReducer},
});
export default store;