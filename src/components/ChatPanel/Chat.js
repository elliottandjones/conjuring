import React from 'react';

const Chat = ({action, displayAction}) => {
  return (
		<div className="chat">
			<div id="sidebar" className="chat__sidebar"></div>
			<div className="chat__main">
				<div id="messages" className="chat__messages"></div>

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