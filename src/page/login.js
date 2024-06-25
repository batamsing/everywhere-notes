import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../component/firebase/firebase";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      window.location.href = "/Home";
      console.log("User logged in successfully!");
    } catch (error) {
      alert("Invalid Email and Password! Please try again");
      console.log(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login">
      <h2>Everywhere Notes</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-btn" type="submit">
          {isLoading ? "LOADING..." : "SIGN IN"}
        </button>
        <div>
          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>

        <div>
          <p>or sign up using</p>
          <div>
            <a href="#">
              <img src="" alt="" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
