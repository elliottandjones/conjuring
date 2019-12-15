import React from "react";
import './MessageItem.css';

// const MessageItem = ({  name, message }) => {
const MessageItem = (props) => {
	let isSentByCurrentUser = false;
  const { username, text, createdAt } = props.message;
	const trimmedName = props.name.trim().toLowerCase();

	if (username === trimmedName) {
		isSentByCurrentUser = true;
	}

	return (
		<div className={`message-container color-white ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
			<p className={`sent-text ${isSentByCurrentUser ? "pr2" : "pl2"}`}>{isSentByCurrentUser ? trimmedName : username} at {createdAt}</p>
			<div className={`message-box ${isSentByCurrentUser ? 'you':'others'}`}>
				<p className="message-text">{text}</p>
			</div>
		</div>
	);
};

export default MessageItem;