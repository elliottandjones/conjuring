import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import MessageItem from "./MessageItem";
import RollMessageItem from './RollMessageItem';

const MessageList = ({ messages, name, isAction }) => (
	<ScrollToBottom className="messages">
		{messages.map((message, i) => (
			<div key={i}>
        {
          !isAction ?
				    <MessageItem message={message} name={name} />
            : <RollMessageItem message={message} name={name} />
        }
			</div>
		))}
	</ScrollToBottom>
);

export default MessageList;

