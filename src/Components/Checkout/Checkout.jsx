import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext"; // Zorg ervoor dat het pad correct is
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
    emptyCart(); // Leeg de winkelmand bij succesvolle betaling
  };

  return (
    <div className="checkout">
      {paymentSuccess ? (
        <h2>Betaling gelukt!</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Betalingsgegevens</h2>
          <div className="form-group">
            <label>Voornaam</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Achternaam</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Emailadres</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Postcode</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Straatnaam</label>
            <input
              type="text"
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Huisnummer</label>
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Betaalmethode</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Selecteer een betaalmethode</option>
              <option value="ideal">iDEAL</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit" className="pay-button">
            Betalen
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
