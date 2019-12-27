import React from "react";
import socketIOClient from 'socket.io-client';
// import useSocket from 'use-socket.io-client';
// import { useDidMount } from '@withvoid/melting-pot';

export const CTX = React.createContext();

// const io = socketIOClient()

const Store = (props) => {
  const [username, setUsername] = React.useState("");
	const [room, setRoom] = React.useState("");
	const [users, setUsers] = React.useState("");
	const [messages, setMessages] = React.useState([]);
  
	// const [socket] = React.useSocket("https://whispering-brook-74854.herokuapp.com/");
  const [socket] = React.useState(socketIOClient("http://localhost:5061"));
  
// args = [ name, text ]

  React.useEffect(() => {
    socket.on("joinRoom", ({ username, room }) => {
      console.log(`socket.on("joinRoom"), from CLIENT`)
      setUsername(username);
      setRoom(room);
    });
    // socket.on('message', (...args) => {
    //   let text = args[0];
    //   console.log(`socket.on(message), from CLIENT(text): ${text}`);
    //   setMessages(messages => [...messages, text ]);
    // });
    socket.on('sendMessage', (...args) => {
      let text = args[0];
      console.log(`socket.on('sendMessage'), from CLIENT(text): ${text}`);
      setMessages(messages => [...messages, text ]);
		});
		socket.on("sendRollMessage", ({ username, creatureName, action}) => {
      console.log(`socket.on("onSendRollMessage"), from CLIENT: ${creatureName}: ${action}`);
			setMessages(messages => [...messages, [username, creatureName, action]]);
		});
		socket.on("roomData", ({ users }) => {
      console.log("socket.on(roomData), from CLIENT")
			setUsers(users);
		});

		return () => {
      socket.disconnect();
      socket.off();
		};
  }, [socket]);

  const sendMessage = (text) => {
		socket.emit("sendMessage", text, error => {
      if (error) {
        return console.log("ERROR from CLIENT: ", error)
      }
      console.log(`MESSAGE SENT, from CLIENT,(text): ${text}`);
    });
	};
	const sendRollMessage = ({ username, creatureName, action }) => {
		socket.emit("sendRollMessage", { username, creatureName, action }, error => {
      if (error) {
        return console.log("ERROR from CLIENT: ", error)
      }
      console.log(`ROLL SENT, from CLIENT: ${username}: ${creatureName}: ${action}`);
    });
	};
	const joinRoom = ({ username, room }) => {
		socket.emit("join", { username, room }, error => {
      if (error) {
        return console.log("ERROR from CLIENT: ", error);
      }
      console.log(`ROOM JOINED, from CLIENT: ${username}: ${room}`);
	  });
	};

	return (
    <CTX.Provider value={{username, room, users, messages, socket, sendMessage, sendRollMessage, joinRoom }}>
      {props.children}
    </CTX.Provider>
  );
}
export default Store;