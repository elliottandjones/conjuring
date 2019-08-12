import React from "react";
import RadioButtonItem from "./RadioButtonItem";

const RadioButtons = ({ onSelect, options, text, className }) => {
  return (
    <div className={className}>
      <fieldset>
        <legend>{text}</legend>
        
        <input id={text} onChange={onSelect} className="radio-input pa2 ma2" type="radio" name={className} defaultChecked={true} />
        <label htmlFor={text} className="radio-label">All</label>
        {options.map(item => (
          <RadioButtonItem
            key={item.value}
            value={item.value}
            name={item.name}
            onChange={onSelect}
            id={item.value}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default RadioButtons;