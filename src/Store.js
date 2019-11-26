import React from "react";
import useSocket from 'use-socket.io-client';

export const CTX = React.createContext();


const Store = (props) => {
  const [name, setName] = React.useState("");
	const [room, setRoom] = React.useState("");
	const [users, setUsers] = React.useState("");
	const [messages, setMessages] = React.useState([]);
  
	const [socket] = useSocket("https://whispering-brook-74854.herokuapp.com/");
  
  React.useEffect(() => {
    socket.on("sendMessage", ({ message }) => {
			setMessages(messages => [...messages, message]);
		});
		socket.on("sendRollMessage", ({ message }) => {
			setMessages(messages => [...messages, message]);
		});
		socket.on("joinRoom", ({ name, room }) => {
			setName(name);
			setRoom(room);
		});
		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});

		return () => {
			socket.disconnect();
			socket.off();
		};
  }, []);

  const sendMessage = ({ message }) => {
		socket.emit("sendMessage", { message });
	};
	const sendRollMessage = ({ creature, action }) => {
		socket.emit("sendRollMessage", { creature, action });
	};
	const joinRoom = ({ name, room }) => {
		socket.emit("join", { name, room }, error => {
			if (error) {
				alert(error);
				console.log(error);
			}
		});
	};

	return (
    <CTX.Provider value={{ name, room, users, messages, socket, sendMessage, sendRollMessage, joinRoom }}>
      {props.children}
    </CTX.Provider>
  );
}
export default Store;