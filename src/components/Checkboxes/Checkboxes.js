import React from "react";
import CheckboxItem from "./CheckboxItem";

const Checkboxes = ({ onChange, options, className }) => {
  return (
    <div id="types-filter" className={className}>
      <fieldset>
        <legend>Type</legend>
        {options.map((item, i) => (
          <CheckboxItem
            key={i}
            id={i}
            name={item.name}
            onChange={onChange}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default Checkboxes;