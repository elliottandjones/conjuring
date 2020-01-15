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
        <div className="message-container justify-end mt1 pl2 pr2">
					<div className="pa2 mt2" style={{display: 'inline-block'}}>
						<i className="sender-name mb2">{trimmedClientName}</i>
						<span className="time">{createdAt}</span>
					</div>
          <div className="message-box you">
            <p className="message-text">{text}</p>
          </div>
        </div>
        )
        : (
          <div className="message-container justify-start mt1 pl2 pr2">
            <div className="message-box others">
              <p className="message-text">{text}</p>
            </div>
            <div className="pa2 mt2" style={{display: 'inline-block'}}>
							<i className="sender-name mb2">{name}</i>
							<span className="time">{createdAt}</span>
						</div>
          </div>
        )
  );
}

export default Message;