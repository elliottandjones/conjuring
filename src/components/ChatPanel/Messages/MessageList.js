import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import MessageItem from "./MessageItem";
import RollMessageItem from './RollMessageItem';

const MessageList = ({ messages, username }) => (
	<ScrollToBottom className="messages">
    <ul style={{ listStyleType: 'none' }}>
      {messages.map((message, index) => (
        <li key={`message_item_${index}`}>
          {
            !message.isAction ?
              <MessageItem username={username} message={message} />
              : <RollMessageItem username={username} message={message} />
          }
        </li>
		  ))}
    </ul>
	</ScrollToBottom>
);

export default MessageList;

