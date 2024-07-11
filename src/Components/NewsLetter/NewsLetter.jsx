import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (!email) {
      setMessage("Please enter an email address");
    } else if (!validateEmail(email)) {
      setMessage(
        "Please enter a valid email address like hello123@example.com"
      );
    } else {
      setMessage("Subscribed to the Newsletter!");
      setEmail(""); 
    }
  };

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers on your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          className="Your Email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="Subscribe" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsLetter;
