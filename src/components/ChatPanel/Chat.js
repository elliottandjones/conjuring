import React from 'react';

const Chat = ({action, displayAction, allChats}) => {
  return (
		<div className="chat">
			<div className="chat-main">
				<div id="messages" className="chat-messages"></div>

				<div className="compose">
					<form id="message-form">
						<input name="message" placeholder="Message" required autocomplete="off" />
						<button>Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Chat;
		// <div id="chat">

		// 	<ChatOutput action={action} displayAction={displayAction}/>
		// 	<ChatInput />
		// </div>