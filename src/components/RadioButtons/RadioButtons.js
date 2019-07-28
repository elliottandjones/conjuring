import React from "react";
import RadioButton from "./RadioButton";

const RadioButtons = ({ onSelect, options, text, className }) => {
  return (
    <div className={className}>
      <fieldset>
        <legend>{text}</legend>
        <label style={{ textTransform: 'capitalize' }}>
          <input onChange={onSelect} className="pa2 ma2" type="radio" name={className} defaultChecked={true} />
          All
        </label>
        {options.map(item => (
          <RadioButton
            key={item.value}
            value={item.value}
            name={item.name}
            onChange={onSelect}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default RadioButtons;