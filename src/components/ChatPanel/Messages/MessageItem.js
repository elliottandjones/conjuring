import React from "react";
import './MessageItem.css';

// message: [username, text]
const MessageItem = ({  username, message }) => {
// const MessageItem = ({username, sender, messageText}) => {
  let isSentByCurrentUser = false;
  
	const trimmedName = username.trim().toLowerCase();

	if (message[0] === trimmedName) {
		isSentByCurrentUser = true;
	}

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : message[0]} at {message.createdAt}</p>
			<div className={`message-box ${isSentByCurrentUser ? 'you':'others'}`}>
				<p className="message-text">{message[1]}</p>
			</div>
		</div>
	);
};

export default MessageItem;