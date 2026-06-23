import { useState } from "react";
import { API_KEY } from "../services/firebase";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error?.message || "Something went wrong"
        );
      }

      alert("Password Reset Email Sent Successfully");
      setEmail("");

    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="forgot-container">
      <form
        className="forgot-form"
        onSubmit={resetPasswordHandler}
      >
        <h2>Forgot Password</h2>

        <p>
          Enter the email with which you have
          registered.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Sending..."
            : "Send Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;