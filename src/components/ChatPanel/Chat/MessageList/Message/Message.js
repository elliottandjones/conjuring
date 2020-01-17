import React from 'react';
import './Message.css';

export default function Message({ message: { name, text, createdAt }, clientName }) {
	const clientUsername = clientName.trim();
  const isCurrentUser = name === clientUsername ? true : false;

  return (
    isCurrentUser ?
        <div className="message-container justify-end mt1 pl2 pr2">
					<div className="meta-msg mt2 pa1" style={{display: 'inline-block'}}>
						<i className="sender-name mb2">{clientUsername}</i>
						<span className="time">{createdAt}</span>
					</div>
          <div className="message-box you">
            <p className="message-text">{text}</p>
          </div>
        </div>
        : <div className="message-container justify-start mt1 pl2 pr2">
            <div className="message-box others">
              <p className="message-text">{text}</p>
            </div>
            <div className="meta-msg mt2 pa1" style={{display: 'inline-block'}}>
							<i className="sender-name mb2">{name}</i>
							<span className="time">{createdAt}</span>
						</div>
          </div>
  );
}