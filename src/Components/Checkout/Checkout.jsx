import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Checkout.css";
import CustomInput from "../Custom/CustomInput.jsx";
import CustomSelect from "../Custom/CustomSelect.jsx";

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
          <CustomInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          <CustomInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          <CustomInput
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          <CustomInput
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter your postal code"
          />
          <CustomInput
            label="Street Name"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            placeholder="Enter your street name"
          />
          <CustomInput
            label="House Number"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            placeholder="Enter your house number"
          />
          <CustomSelect
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            options={[
              { value: "", label: "Select a payment method" },
              { value: "ideal", label: "iDEAL" },
              { value: "paypal", label: "PayPal" },
            ]}
          />
          <button type="submit" className="pay-button">
            Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
