import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/welcome"
          element={<Welcome />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;