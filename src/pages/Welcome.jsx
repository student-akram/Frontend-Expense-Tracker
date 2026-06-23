import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          borderBottom: "1px solid black",
        }}
      >
        <h2>
          Welcome to Expense Tracker!!!
        </h2>

        <div>
          Your profile is incomplete.

          <Link to="/profile">
            Complete now
          </Link>
        </div>
      </div>
    </>
  );
}

export default Welcome;