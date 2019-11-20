import React, { useState, useEffect, useContext } from "react";
import { CTX } from '../../Store';
// import queryString from "query-string";
// import io from "socket.io-client";

import MessageList from "./Messages/MessageList";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageInput from "./MessageInput/MessageInput";
// import { rollAttack, rollDamage, getTotalDamage } from './Roll';
import "./Chat.css";
import {CTX} from '../../Store';
// let socket;

const Chat = (props) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [users, setUsers] = useState("");
	const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatState, updateState] = useContext(CTX);
	// const ENDPOINT = "https://project-chat-application.herokuapp.com/";
	const ENDPOINT = "http://localhost:5061";

	useEffect(() => {
		// const { name, room } = queryString.parse(location.search);

		// socket = io(ENDPOINT);

		setRoom(room);
		setName(name);

		socket.emit("join", { name, room }, error => {
			if (error) {
				alert(error);
			}
		});
	}, []);
	// }, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", message => {
			setMessages([...messages, message]);
		});

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});

		return () => {
			socket.emit("disconnect");

			socket.off();
		};
	}, [messages]);

	const sendMessage = e => {
		e.preventDefault();

    // if (action) {
		// 	socket.emit("sendRollMessage",  displayAction);
		// }

		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
    }
    
	};

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
