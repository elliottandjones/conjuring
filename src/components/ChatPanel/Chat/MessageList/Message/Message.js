import React from 'react';
import './Message.css';


const Message = ({ message: { name, text, createdAt }, clientName }) => {
  let isCurrentUser = false;

	const trimmedClientName = clientName.trim(); //.toLowerCase();

  if(name === trimmedClientName) {
    isCurrentUser = true;
  }

  return (
    isCurrentUser
      ? (
        <div className="message-container justify-end">
					<div className="pr2" style={{display: 'inline-block'}}>
						<i className="sender-name">{trimmedClientName}</i>
						<span className="time">{createdAt}</span>
					</div>
          <div className="message-box you">
            <p className="message-text">{text}</p>
          </div>
        </div>
        )
        : (
          <div className="message-container justify-start">
            <div className="message-box others">
              <p className="message-text">{text}</p>
            </div>
            <i className="sender-name pl2">{name}</i>
            <p className="time">{createdAt}</p>
          </div>
        )
  );
}

export default Message;