import { useState } from "react";
import "./ExpenseTracker.css";

function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [expenses, setExpenses] =
    useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      amount,
      description,
      category,
    };

    setExpenses((prev) => [
      ...prev,
      newExpense,
    ]);

    setAmount("");
    setDescription("");
    setCategory("Food");
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