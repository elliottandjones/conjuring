import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import MessageItem from "./MessageItem";
import RollMessageItem from './RollMessageItem';

const MessageList = ({ messages, username }) => (
	<ScrollToBottom className="messages">
    <ul style={{ listStyleType: 'none' }}>
      {messages.map((message, i) => (
        <li key={`message_item_${i}`}>
          {
            !message.isAction ?
              <MessageItem message={message} name={username} />
              : <RollMessageItem message={message} name={username} />
          }
        </li>
		  ))}
    </ul>
	</ScrollToBottom>
);

export default MessageList;

