import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
    streetName: "",
    houseNumber: "",
    paymentMethod: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { emptyCart } = useContext(ShopContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    emptyCart();
  };

  return (
    <div className="checkout">
      {paymentSuccess ? (
        <h2>Payment Successful!</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Payment Details</h2>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Street Name</label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>House Number</label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select a payment method</option>
              <option value="ideal">iDEAL</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit" className="pay-button">
            Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
