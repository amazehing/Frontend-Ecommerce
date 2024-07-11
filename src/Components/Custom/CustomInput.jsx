import React from "react";

const CustomInput = ({ name, value, onChange, placeholder, label }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default CustomInput;
