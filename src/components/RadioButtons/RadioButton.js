import React from 'react';

const RadioButton = ({ value, name, onChange}) => {
  return (
    <label style={{ textTransform: 'capitalize' }}>
      <input
        className="pa2 ma2"
        type="radio"
        defaultChecked={false}
        value={value}
        name={name}
        onChange={onChange}
      />
      {value}
    </label>
  );
};

export default RadioButton;