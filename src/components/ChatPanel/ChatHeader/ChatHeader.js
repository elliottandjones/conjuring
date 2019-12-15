import React from 'react';

import './ChatHeader.css';

const ChatHeader = ({ room }) => (
  <div className="chat-header">
    {/* <div className="leftInnerContainer"> */}
      <h3>{room}</h3>
    {/* </div> */}
    <div className="rightInnerContainer">
      <a href="/" className="close-chat">
      &times;
      </a>
    </div>
  </div>
);

export default ChatHeader;