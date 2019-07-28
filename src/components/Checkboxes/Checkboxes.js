import React from "react";
import Checkbox from "./Checkbox";
import './Checkboxes.css';

const Checkboxes = ({ onChange, options, className }) => {
  return (
    <div id="types-filter" className={className}>
      <fieldset>
        <legend>Type</legend>
        {options.map((item, i) => (
          <Checkbox
            key={i}
            name={item.name}
            onChange={onChange}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default Checkboxes;