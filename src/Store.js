import React from "react";
import socketIOClient from 'socket.io-client';
import { useDidMount } from '@withvoid/melting-pot';

export const CTX = React.createContext();

// const io = socketIOClient()

const Store = (props) => {
  const [username, setName] = React.useState("");
	const [room, setRoom] = React.useState("");
	const [users, setUsers] = React.useState("");
	const [messages, setMessages] = React.useState([]);
  
	// const [socket] = React.useSocket("https://whispering-brook-74854.herokuapp.com/");
  const [socket] = React.useState(socketIOClient("http://localhost:5061"));
  
  useDidMount(() => {
    socket.on('message', ({username, text}) => {
      console.log(`socket.on(message), from CLIENT: ${username}: ${text}`);
      setMessages(messages => [...messages, [username, text] ]);
    });
    socket.on("sendMessage", ({ username, text }) => {
      console.log(`socket.on("onSendMessage"), from CLIENT: ${username}: ${text}`);
			setMessages(messages => [...messages, [username, text]]);
		});
		socket.on("sendRollMessage", ({ username, creatureName, action}) => {
      console.log(`socket.on("onSendRollMessage"), from CLIENT: ${creatureName}:`, action);
			setMessages(messages => [...messages, [username, creatureName, action]]);
		});
		socket.on("joinRoom", ({ username, room }) => {
      console.log(`socket.on("joinRoom"), from CLIENT`)
			setName(username);
			setRoom(room);
		});
		socket.on("roomData", ({ users }) => {
      console.log("socket.on(roomData), from CLIENT")
			setUsers(users);
		});

		return () => {
      socket.disconnect();
      socket.off();
		};
  }, []);

  const sendMessage = ({ username, text }) => {
		socket.emit("sendMessage", { username, text }, error => {
      if (error) {
        return console.log("ERROR from CLIENT: ", error)
      }
      console.log(`MESSAGE SENT, from CLIENT: ${username}: ${text}`);
    });
	};
	const sendRollMessage = ({username, creatureName, action }) => {
		socket.emit("sendRollMessage", {username, creatureName, action }, error => {
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