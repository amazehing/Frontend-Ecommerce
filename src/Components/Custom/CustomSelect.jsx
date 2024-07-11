import React from "react";

const CustomSelect = ({ name, value, onChange, options, label }) => (
  <div className="form-group">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default CustomSelect;
