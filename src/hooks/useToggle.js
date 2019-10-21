import { useState } from 'react';

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