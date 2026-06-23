import { Link } from "react-router-dom";
import { API_KEY } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import ExpenseTracker from "../pages/ExpenseTracker";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import "./welcome.css"

function Welcome() {
    const navigate = useNavigate();
    const logoutHandler = () => {
  localStorage.removeItem("token");
  dispatch(
  authActions.logout()
);

  navigate("/login");
};

  const verifyEmailHandler = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error.message
        );
      }

      alert(
        "Verification Email Sent Successfully"
      );

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="welcome-header">
  <h1>Welcome to Expense Tracker!!!</h1>

  <div className="welcome-actions">
    <Link to="/profile">
      Complete Profile
    </Link>

    <button
      className="logout-btn"
      onClick={logoutHandler}
    >
      Logout
    </button>
  </div>
</div>

<ExpenseTracker />
</>
  );
}

export default Welcome;