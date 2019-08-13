import React from "react";
import "./RadioButton.css";

const RadioButtonItem = ({ value, name, onChange, id }) => {
  return (
    <div className="radio">
      <input
        id={id}
        className="radio-input"
        type="radio"
        value={value}
        name={name}
        onChange={onChange}
      />
      <label htmlFor={id} className="radio-label">{value}</label>
    </div>
  );
};

export default RadioButtonItem;
