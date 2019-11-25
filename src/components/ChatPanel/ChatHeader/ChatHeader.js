import React from 'react';

import './ChatHeader.css';

const ChatHeader = ({ room }) => (
  <div className="chat-header">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" style={{color: "white"}}>&close;</a>
    </div>
  </div>
);

export default ChatHeader;