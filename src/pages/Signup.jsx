import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(
        "User has successfully signed up"
      );

      alert("Signup Successful");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <form
        className="signup-form"
        onSubmit={submitHandler}
      >
        <h1>SignUp</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        {error && (
          <p className="error">{error}</p>
        )}

        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            !confirmPassword
          }
        >
          Sign Up
        </button>

        <p>
          Have an account? Login
        </p>
      </form>
    </div>
  );
}

export default Signup;