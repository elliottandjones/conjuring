import React from 'react'
import './Select.css'

export default function Select({ options, onChange, value, className }) {
  return (
    <div className={className}>
      <fieldset>
        <legend title="Challenge Rating">Challenge Rating</legend>
        <select className="select-input" name={options[0].name} id={options[0].name} onChange={onChange} value={value}>
          {options.map(option => (
            <option label={option.name} key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={options[0].name} className="sr-only">
          {options[0].name}
        </label>
      </fieldset>
    </div>
  )
}

// return (
//   <div className={`slct ${isDisabled ? "tooltip" : "inp-hvr"}`}>
//     <span className="tooltiptext" style={{ opacity: "1" }}>
//       Filters are disabled while a spell is selected.
//     </span>
//     <select
//       className={`select-input hotem pl1 ${isDisabled ? "o-50" : ""}`}
//       name={options[0].name}
//       id={options[0].name}
//       onChange={onSelectChange}
//       value={value}
//       disabled={isDisabled}
//     >
//       {options.map(option => (
//         <option label={option.name} key={option.name} value={option.name}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//     <label htmlFor={options[0].name} className="sr-only">
//       {options[0].name}
//     </label>
//   </div>
// );
