import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initState = {
	general: [
		{ from: "Innkeeper", msg: "Welcome, Adventur--ohjeezherewego." },
		{ from: "Blazenith Furtwunni", msg: "YOOOO, ennkeeperrr, WHAT UP my dude. Long time no chiiill, dude!" },
		{ from: "Dhudenbruh Suhmzzah", msg: "Chyaaaaah, wha's good, hooombre--aaahahuhaha." },
		{ from: "Innkeeper", msg: "*sigh*--hullo there... Blazenith--Dhudenbruh. What'll it be tonigh--" },
		{ from: "Dhudenbruh Suhmzzah", msg: "Bruuhhhh, I told you you can call me bruh, bruh. Cus we're basically like, bros, bruh." },
		{ from: "Innkeeper", msg: "yeah--yeah I know... *siiigh*" }
	],
	room2: [{ from: "Innkeeper", msg: "Welcome, Adventurer!" }]
};

function reducer(state, action) {
	const { from, msg, room } = action.payload;

	switch (action.type) {
		case "MESSAGE_RECIEVED":
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

function sendChatAction(socket, value) {
	socket.emit("message", value);
}

export default function Store(props) {
  
  if (!socket) {
		socket = io(":3001");
  }
  const user = 'elliott_' + Math.random(100).toFixed(2);
	// const reducerHook = React.useReducer(reducer, initState);
	const [allChats] = React.useReducer(reducer, initState);

	return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
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
