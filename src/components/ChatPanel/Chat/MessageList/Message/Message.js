import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
  let isCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isCurrentUser = true;
  }

  return (
    isCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText colorWhite pr2">{trimmedName}</p>
          <div className="messageBox">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox">
              <p className="messageText">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText colorWhite pl2">{user}</p>
          </div>
        )
  );
}

export default Message;