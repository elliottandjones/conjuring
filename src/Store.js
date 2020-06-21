import React from 'react';

export const CTX = React.createContext();

const Store = (props) => {
  const [creatureName, setCreatureName] = React.useState('');
  const [action, setAction] = React.useState(null);
  const [proceed, setProceed] = React.useState(false);

  const sendRoll = (e, cName, cAction) => {
    e.preventDefault();
    setCreatureName(cName);
    setAction(cAction);
    setProceed(true);
  };
  const clearRollState = () => {
    setProceed(false);
  };

  return <CTX.Provider value={{ proceed, creatureName, action, sendRoll, clearRollState }}>{props.children}</CTX.Provider>;
};

export default Store;
