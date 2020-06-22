import { useState } from 'react';

export const useToggleHeight = (initialState) => {
  const [toggleState, setToggleState] = useState(initialState[0]);
  const [heightState, setHeightState] = useState(0);
  const toggle = (e) => {
    e.preventDefault();
    setToggleState(!toggleState);
    setHeightState(initialState[1].current.clientHeight);
  };
  return [toggleState, heightState, toggle];
};

export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = (e) => {
    e.preventDefault();
    setState(!state);
  };
  return [state, toggle];
};

// export { useToggle, useToggleHeight };
