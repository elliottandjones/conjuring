import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import MessageItem from "./MessageItem";

const MessageList = ({ messages, name }) => (
	<ScrollToBottom className="messages">
		{messages.map((message, i) => (
			<div key={i}>
				<MessageItem message={message} name={name} />
			</div>
		))}
	</ScrollToBottom>
);

export default MessageList;

