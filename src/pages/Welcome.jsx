import { Link } from "react-router-dom";
import { API_KEY } from "../services/firebase";

function Welcome() {

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

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
        }}
      >
<button
  className="verify-btn"
  onClick={verifyEmailHandler}
>
  Verify Email
</button>
      </div>
    </>
  );
}

export default Welcome;