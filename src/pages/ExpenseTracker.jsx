import { useState } from "react";
import "./ExpenseTracker.css";
import { useEffect } from "react";
import { DATABASE_URL } from "../services/firebase";

function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [expenses, setExpenses] =
    useState([]);
    useEffect(() => {
  fetchExpenses();
}, []);
const fetchExpenses = async () => {
  try {
    const response = await fetch(
      `${DATABASE_URL}/expenses.json`
    );

    const data = await response.json();

    if (!data) {
      setExpenses([]);
      return;
    }

    const loadedExpenses = [];

    for (const key in data) {
      loadedExpenses.push({
        id: key,
        ...data[key],
      });
    }

    setExpenses(loadedExpenses);
  } catch (error) {
    console.log(error);
  }
};

 const submitHandler = async (e) => {
  e.preventDefault();

  const expense = {
    amount,
    description,
    category,
  };

  try {
    const response = await fetch(
      `${DATABASE_URL}/expenses.json`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(expense),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to save expense"
      );
    }

    fetchExpenses();

    setAmount("");
    setDescription("");
    setCategory("Food");

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="expense-container">
      <h2>Expense Tracker</h2>

      <form
        className="expense-form"
        onSubmit={submitHandler}
      >
        <input
          type="number"
          placeholder="Money Spent"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option>Food</option>
          <option>Petrol</option>
          <option>Salary</option>
          <option>Movie</option>
          <option>Shopping</option>
        </select>

        <button type="submit">
          Add Expense
        </button>
      </form>

      <div className="expense-list">
        <h3>Your Expenses</h3>

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="expense-card"
          >
            ₹{expense.amount}
            {" - "}
            {expense.description}
            {" - "}
            {expense.category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseTracker;