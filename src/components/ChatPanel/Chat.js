import React from 'react';
import ChatInput from './ChatInput';
import ChatOutput from './ChatOutput';

const Chat = ({action, displayAction}) => {
  return (
		<div id="chat">
			<ChatOutput action={action} displayAction={displayAction}/>
			<ChatInput />
		</div>
	);
};

export default Chat;