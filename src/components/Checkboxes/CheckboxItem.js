import React from 'react'
import './Checkbox.css'

const CheckboxItem = ({ name, onChange, id }) => {
  return (
    <div className="checkbox">
      <input
        className="checkbox-input"
        id={id}
        type="checkbox"
        name={name}
        defaultChecked={false}
        onChange={onChange}
      />
      <label htmlFor={id} className="checkbox-label">
        {name}
      </label>
    </div>
  )
}

export default CheckboxItem
