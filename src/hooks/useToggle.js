import { useState, useCallback } from "react";

const useToggle = initialValue => {
	const [value, setValue] = useState(initialValue);
	const toggler = useCallback(() => setValue(value => !value));
	return [value, toggler];
};

export default useToggle;
// function Demo() {
//   const [currentValue, toggleAway] = useCallbackToggle(true);
//   return <div onClick={toggleAway}>{currentValue ? "🍎" : "🍏"}</div>;
// }
