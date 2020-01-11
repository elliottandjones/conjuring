import React from 'react';
import './ChatHeader.css';

const ChatHeader = ({ room }) => (
  <div className="chat-header header">
    <div className="left-wrapper">
      <h4>{room}</h4>
    </div>
    <div className="right-wrapper">
      <a 
				href="/" 
				title="leave this chatroom"
				// todo: replace with <Link to="/join"> Component
					// ? because "/" causes page reload && repeats data fetching in App.js (in componentDidMount)
				// todo: create new "/join" route and specify it in <ChatPanel> as well
				>&times;
      </a>
    </div>
  </div>
);

export default ChatHeader;