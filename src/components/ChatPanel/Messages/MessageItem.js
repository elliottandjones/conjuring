import React from "react";
import './MessageItem.css';

// message: [username, text]
const MessageItem = ({text, ...args}) => {
// const MessageItem = ({username, sender, messageText}) => {
  let isSentByCurrentUser = false;
  
	const trimmedName = args[0].trim().toLowerCase();

	if (args[0] === trimmedName) {
		isSentByCurrentUser = true;
	}

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : args[0]} at {args[1]}</p>
			<div className={`message-box ${isSentByCurrentUser ? 'you':'others'}`}>
				<p className="message-text">{text}</p>
			</div>
		</div>
	);
};

export default MessageItem;