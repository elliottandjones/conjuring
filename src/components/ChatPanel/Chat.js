import React, { useState, 
  //useEffect
} from "react";

import MessageList from "./Messages/MessageList";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageInput from "./MessageInput/MessageInput";
import "./Chat.css";

const Chat = ({ messages, room, name, users, sendMessage, sendRollMessage, joinRoom }) => {
	const [message, setMessage] = useState("");
	// const ENDPOINT = "https://whispering-brook-74854.herokuapp.com/"


	return (
		<div id="panel-wrapper" className="outerContainer">
			<div id="panel" className="container">
				<Sidebar users={users} />
				<div id="chat">
					<ChatHeader room={room} />
					<div id="chat-out">
						<MessageList messages={messages} name={name} />
					</div>
					<div id="chat-in">
						<MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;

	// useEffect(() => {
	// 	const { name, room } = queryString.parse(location.search);

	// 	socket = io(ENDPOINT);

	// 	setRoom(room);
	// 	setName(name);

	// 	socket.emit("join", { name, room }, error => {
	// 		if (error) {
	// 			alert(error);
	// 		}
	// 	});
	// }, []);
	// }, [ENDPOINT, location.search]);

	// useEffect(() => {
	// 	socket.on("message", message => {
	// 		setMessages([...messages, message]);
	// 	});

	// 	socket.on("roomData", ({ users }) => {
	// 		setUsers(users);
	// 	});

	// 	return () => {
	// 		socket.emit("disconnect");

	// 		socket.off();
	// 	};
	// }, [messages, ENDPOINT]);

	// const sendMessage = e => {
	// 	e.preventDefault();

	//   // if (action) {
	// 	// 	socket.emit("sendRollMessage",  displayAction);
	// 	// }

	// 	if (message) {
	// 		socket.emit("sendMessage", message, () => setMessage(""));
	//   }

	// };