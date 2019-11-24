import React from "react";
import './MessageItem.css';

const MessageItem = ({ message: { text, user }, name, time }) => {
	let isSentByCurrentUser = false;
  
	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : user} at {time}</p>
			<div className={`message-box ${isSentByCurrentUser ? 'you':'others'}`}>
				<p className="message-text">{text}</p>
			</div>
		</div>
	);
};

export default MessageItem;