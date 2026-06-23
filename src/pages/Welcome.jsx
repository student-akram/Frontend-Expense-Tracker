import { Link } from "react-router-dom";
import { API_KEY } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();
    const logoutHandler = () => {
  localStorage.removeItem("token");

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
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #ccc",
  }}
>
  <h2>
    Welcome to Expense Tracker!!!
  </h2>

  <div
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >
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
</>
  );
}

export default Welcome;