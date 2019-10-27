import React from 'react';
import io from "socket.io-client";

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
      };
		default:
      return state;
	}
}

let socket;

export default function Store(props) {
  
  if (!socket) {
    socket = io(':3001')
  }

  // const reducerHook = React.useReducer(reducer, initState);
  const [allChats] = React.useReducer(reducer, initState);
  
  return (
    <CTX.Provider value={{allChats}}>
      {props.children}
    </CTX.Provider>
  );
}