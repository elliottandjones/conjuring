import { useState } from 'react'

/* Custom toggle hook that also sets and returns the height of a ref object
 * @params [boolean, ref]
 */
const useToggleHeight = initialValues => {
	const [toggleValue, setValue] = useState(initialValues[0]);
	const [componentHeight, setHeight] = useState(0);
	const toggler = e => {
		e.preventDefault();
		setValue(!toggleValue);
		setHeight(initialValues[1].current.clientHeight);
	};
	return [toggleValue, componentHeight, toggler];
};

const useToggle = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggler = e => {
    e.preventDefault();
    setValue(!value);
  };
  return [value, toggler];
};

export {
  useToggle,
  useToggleHeight
};