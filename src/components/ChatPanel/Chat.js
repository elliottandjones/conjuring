import React from 'react';
import ChatInput from './ChatInput';
import ChatOutput from './ChatOutput';

const Chat = (props) => {
  return (
		<div id="chat">
			<ChatOutput />
			<ChatInput />
		</div>
	);
};

export default Chat;