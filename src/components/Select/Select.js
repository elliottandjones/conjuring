import React from 'react';

const Select = ({ options, onSelectChange, value, isDisabled }) => {
  return (
    <div className={`mt3 ${isDisabled ? 'tooltip' : 'groww'}`}>
      <span className="tooltiptext" style={{ opacity: '1' }}>Filters are disabled while a spell is selected.</span>
      <select
        className="select hotem pl1"
        name={options[0].name}
        id={options[0].name}
        onChange={onSelectChange}
        value={value}
        disabled={isDisabled}
      >
        {options.map(option => (
          <option label={option.name} key={option.name} value={option.name}>{option.name}</option>
        ))}
      </select>
      <label htmlFor={options[0].name} className="sr-only">{options[0].name}</label>
    </div>
  );
}

export default Select;

// onClick = {() => { displaySpellDetails() }}
// return options[0].name === 'Spell'
//   ? (
//     <select
//       className="spell-select hotem pl2"
//       id={options[0].name}
//       onChange={onSelectChange}
//       value={value}
//     >
//       {options.map((option) => (
//         <option key={option.name} value={option.name}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//   )
//   : (
//     <select
//       className="select hotem pl2 mt1"
//       id={options[0].name}
//       onChange={onSelectChange}
//       value={value}
//     >
//       {options.map(option => (
//         <option key={option.name} value={option.name}>{option.name}</option>
//       ))}
//     </select>
//   );