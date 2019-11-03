import React from "react";
import Message from './Message';

const Messages = props => {
	return (
		<React.Fragment>
      {
        props.chat.messages.map(msg => {
          <Message />
        })
      }
    </React.Fragment>
	);
};

export default Messages;
