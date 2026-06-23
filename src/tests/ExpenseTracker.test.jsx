import { render, screen } from "@testing-library/react";
import ExpenseTracker from "../pages/ExpenseTracker";
import { Provider } from "react-redux";
import store from "../store";

describe("Expense Tracker Tests", () => {

  test("renders expense tracker heading", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByText("Expense Tracker")
    ).toBeInTheDocument();
  });

  test("renders money spent input", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByPlaceholderText("Money Spent")
    ).toBeInTheDocument();
  });

  test("renders description input", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByPlaceholderText("Description")
    ).toBeInTheDocument();
  });

  test("renders category dropdown", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByDisplayValue("Food")
    ).toBeInTheDocument();
  });

  test("renders add expense button", () => {
   render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByRole("button", {
        name: /add expense/i,
      })
    ).toBeInTheDocument();
  });

  test("money spent input exists", () => {
   render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    const input =
      screen.getByPlaceholderText(
        "Money Spent"
      );
    expect(input).toBeTruthy();
  });

  test("description input exists", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    const input =
      screen.getByPlaceholderText(
        "Description"
      );
    expect(input).toBeTruthy();
  });

  test("food option exists", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByText("Food")
    ).toBeInTheDocument();
  });

  test("expense list heading exists", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(
      screen.getByText("Your Expenses")
    ).toBeInTheDocument();
  });

  test("component renders without crashing", () => {
    render(
  <Provider store={store}>
    <ExpenseTracker />
  </Provider>
);
    expect(true).toBe(true);
  });

});