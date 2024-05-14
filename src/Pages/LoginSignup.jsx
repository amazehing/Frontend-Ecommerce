import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const toggleState = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input type="text" placeholder="Your Name" />}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">I accept the Terms of Service.</label>
        </div>
        <button>Continue</button>
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
