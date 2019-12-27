import React from "react";

import MessageList from "./Messages/MessageList";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./ChatHeader/ChatHeader";
import MessageInput from "./MessageInput/MessageInput";

import "./Chat.css";

const Chat = ({ text, setText, messages, room, username, users, sendMessage }) => {
  return (
    <div id="panel-wrapper" className="outerContainer">
      <div id="panel" className="container">
        <Sidebar users={users} />
        <div id="chat">
          <div id="chat-out">
            <ChatHeader room={room} />
            <MessageList messages={messages} username={username} />
          </div>
          <div id="chat-in">
            <MessageInput text={text} setText={setText} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
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
