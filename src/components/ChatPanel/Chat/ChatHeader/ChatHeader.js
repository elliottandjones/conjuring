import React from 'react'
import './ChatHeader.css'

export default function ChatHeader({ room }) {
  return (
    <div className="chat-header header">
      <div className="left-wrapper">
        <p>{room}</p>
      </div>
      <div className="right-wrapper">
        <a href="/" title="leave this chatroom">
          &times;
        </a>
      </div>
    </div>
  )
}
// <Link to="/" title="leave this chatroom">
// 	&times;
// </Link>
