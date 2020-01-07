import React from 'react';

import './ChatHeader.css';

const ChatHeader = ({ room }) => (
  <div className="panelHeader">
    <div className="leftWrapper">
      <h3>{room}</h3>
    </div>
    <div className="rightWrapper">
      <a 
        href="/"
        title="leave this chatroom"
        style={{color:'white'}}
        >&times;
      </a>
    </div>
  </div>
);

export default ChatHeader;