import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Checkout.css";
import CustomInput from "../Custom/CustomInput";
import CustomSelect from "../Custom/CustomSelect";

const Checkout = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    postalCode: "",
    streetName: "",
    houseNumber: "",
    paymentMethod: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { emptyCart } = useContext(ShopContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    emptyCart();
  };

  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      placeholder: "Enter your first name",
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter your last name",
    },
    {
      label: "Email Address",
      name: "email",
      placeholder: "Enter your email address",
    },
    {
      label: "Postal Code",
      name: "postalCode",
      placeholder: "Enter your postal code",
    },
    {
      label: "Street Name",
      name: "streetName",
      placeholder: "Enter your street name",
    },
    {
      label: "House Number",
      name: "houseNumber",
      placeholder: "Enter your house number",
    },
  ];

  return (
    <div className="checkout">
      {paymentSuccess ? (
        <h2>Payment Successful!</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Payment Details</h2>
          {inputFields.map((field) => (
            <CustomInput
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          ))}
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
