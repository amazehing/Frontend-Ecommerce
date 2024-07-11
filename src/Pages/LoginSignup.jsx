import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";
import { AuthContext } from "../Context/AuthContext";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (state === "Login") {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) setUsername(savedUsername);
      setPassword("");
    }
  }, [state]);

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
    setMessage("");
    setUsername("");
    setPassword("");
  };

  const handleSignUp = () => {
    if (!agreeTerms) {
      setMessage("You must agree to the terms of service.");
      return;
    }

    const storedUsername = localStorage.getItem("username");

    if (storedUsername === username) {
      setMessage(
        "An account with this username already exists. Click on Login here."
      );
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setMessage("Account created successfully. Please wait....");
    setTimeout(() => {
      setState("Login");
      setMessage("");
    }, 3000);
  };

  const handleLogin = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername === username && storedPassword === password) {
      login(username);
    } else {
      setMessage("Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    setMessage("Password reset functionality will be implemented soon.");
  };

  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setAgreeTerms(false);
  };

  const handleSubmit = () => {
    if (state === "Sign Up") {
      handleSignUp();
    } else {
      handleLogin();
    }
    clearInputs();
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {message && <p className="message">{message}</p>}
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {state === "Sign Up" && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {state === "Sign Up" && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            <label htmlFor="">I accept the Terms of Service.</label>
          </div>
        )}
        <button type="button" onClick={handleSubmit}>Continue</button>
        {state === "Login" && (
          <p className="loginsignup-forgot" onClick={handleForgotPassword}>
            Forgot password?
          </p>
        )}
        <p className="loginsignup-login" onClick={toggleState}>
          {state === "Login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span>{state === "Login" ? "Sign Up" : "Login"} here</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
