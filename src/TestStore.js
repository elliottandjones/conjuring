import React from 'react';

export const CTX = React.createContext()

const Store = (props) => {
  const [creatureName, setCreatureName] = React.useState('');
  const [action, setAction] = React.useState(null);
  
  const sendRollMessage = (e, cName, cAction) => {
    e.preventDefault();
    setCreatureName(cName)
    setAction(cAction);
  }
  const clearRollState = () => {
    setCreatureName('');
    setAction(null);
  }
  
  
  return (
    <CTX.Provider value={{ creatureName, action, sendRollMessage, clearRollState }}>
      {props.children}
    </CTX.Provider>
  );
}

export default Store;