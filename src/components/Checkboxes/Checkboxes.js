import React from "react";
import CheckboxItem from "./CheckboxItem";

const Checkboxes = ({ onChange, options, className }) => {
  return (
    <div id="types-filter" className={className}>
      <fieldset>
        <legend>Type</legend>
        {Object.entries(options).map(([key, value]) => (
          <CheckboxItem
            key={key}
            id={key}
            name={key}
            onChange={onChange}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default Checkboxes;