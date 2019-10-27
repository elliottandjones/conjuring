import React from 'react';

export const CTX = React.createContext();

/*
  msg: {
    from: 'user',
    message: 'hello world',
    room: 'butts_lol'
  }

  state: {
    general: [
      {msg}, {msg}, {msg}
    ],
    room2: [
      {msg}, {msg}, {msg}
    ]
  }
*/

const initState = {
	general: [{ from: "Innkeeper", msg: "Welcome, Adventurer!" }],
  room2: [
    { from: "Innkeeper", msg: "Welcome, Adventurer!" },
    { from: "Innkeeper", msg: "Welcome, Adventurer!" },
    { from: "Innkeeper", msg: "Welcome, Adventurer!" }
  ]
};

function reducer(state, action) {
  const { from, msg, room } = action.payload;

  switch (action.type) {
		case 'MESSAGE_RECIEVED':
      return {
        ...state,
        [room]: [
          ...state[room],
          { from, msg }
        ]
      }
		default:
      return state;
	}
}

export default function Store(props) {
  
  const reducerHook = React.useReducer(reducer, initState);
  
  return (
    <CTX.Provider value={reducerHook}>
      {props.children}
    </CTX.Provider>
  );
}