import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const token =
        await userCredential.user.getIdToken();

      localStorage.setItem(
        "token",
        token
      );

      dispatch(
        authActions.login(token)
      );

      navigate("/welcome");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <form
        className="signup-form"
        onSubmit={submitHandler}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <p>
          Don't have an account?{" "}
          <Link to="/">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;