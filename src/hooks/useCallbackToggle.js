import { useState, useCallback } from "react";

const useCallbackToggle = initialValue => {
	const [value, setValue] = useState(initialValue);
	const toggler = useCallback(() => setValue(value => !value));
	return [value, toggler];
};

export default useCallbackToggle;
// function Demo() {
//   const [currentValue, toggleAway] = useCallbackToggle(true);
//   return <div onClick={toggleAway}>{currentValue ? "🍎" : "🍏"}</div>;
// }
