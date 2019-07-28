import React from 'react';

const Checkbox = ({name, onChange}) => {

  return (
    <label style={{ textTransform: 'capitalize' }}>
      <input
        className="pa2 ma2"
        type="checkbox"
        name={name}
        defaultChecked={false}
        onChange={onChange}
      />
      {name}
    </label>
  );
}

export default Checkbox;
