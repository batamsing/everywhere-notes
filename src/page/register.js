import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../component/firebase/firebase";
import "./login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisteredComplete, setIsRegisteredComplete] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setIsRegisteredComplete(false);

    if (password !== confirmPassword) {
      return alert("Password do not match! Please try agian");
    }

    try {
      setIsLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          fullName: fullName,
          gender: gender,
        });
        console.log("User registered successfully");
        await setIsRegisteredComplete(true);
      }

      // window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      if (user && isRegisteredComplete) {
        console.log("User already signed in, redirecting...");
        window.location.href = "/";
      } 
      
    });

    return () => unsubscribe(); // Cleanup function to remove the listener on component unmount
  }, [isRegisteredComplete]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

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

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="register-btn" type="submit">
          {isLoading ? "LOADING..." : "REGISTER"}
        </button>

        <div>
          <p>
            Have an account? <Link to="/login">Log In Here</Link>
          </p>
        </div>

        <div>
          <p>or sign up using</p>
          <div style={{ fontWeight: "bold" }}>COMING SOON</div>
        </div>
      </form>
    </div>
  );
}

export default Register;
