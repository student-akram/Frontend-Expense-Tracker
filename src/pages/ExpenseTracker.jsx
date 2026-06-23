import { useState, useEffect } from "react";
import "./ExpenseTracker.css";
import { DATABASE_URL } from "../services/firebase";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  expenseActions,
} from "../store/expenseSlice";

function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("Food");
  const [editingId, setEditingId] =
    useState(null);

  const dispatch = useDispatch();

  const expenses = useSelector(
    (state) => state.expenses.expenses
  );

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

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
        dispatch(
          expenseActions.setExpenses([])
        );
        return;
      }

      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key],
        });
      }

      dispatch(
        expenseActions.setExpenses(
          loadedExpenses
        )
      );
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
      if (editingId) {
        await fetch(
          `${DATABASE_URL}/expenses/${editingId}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              expense
            ),
          }
        );

        setEditingId(null);
      } else {
        await fetch(
          `${DATABASE_URL}/expenses.json`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              expense
            ),
          }
        );
      }

      fetchExpenses();

      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseHandler =
    async (id) => {
      try {
        await fetch(
          `${DATABASE_URL}/expenses/${id}.json`,
          {
            method: "DELETE",
          }
        );

        console.log(
          "Expense successfully deleted"
        );

        fetchExpenses();
      } catch (error) {
        console.log(error);
      }
    };

  const editExpenseHandler = (
    expense
  ) => {
    setAmount(expense.amount);

    setDescription(
      expense.description
    );

    setCategory(expense.category);

    setEditingId(expense.id);
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
          {editingId
            ? "Update Expense"
            : "Add Expense"}
        </button>
      </form>

      {totalExpenses > 10000 && (
        <button
          style={{
            backgroundColor: "gold",
            color: "black",
            padding: "10px",
            marginTop: "20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Activate Premium
        </button>
      )}

      <div className="expense-list">
        <h3>Your Expenses</h3>

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="expense-card"
          >
            <div>
              ₹{expense.amount}
              {" - "}
              {expense.description}
              {" - "}
              {expense.category}
            </div>

            <div className="expense-actions">
              <button
                className="edit-btn"
                onClick={() =>
                  editExpenseHandler(
                    expense
                  )
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteExpenseHandler(
                    expense.id
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseTracker;