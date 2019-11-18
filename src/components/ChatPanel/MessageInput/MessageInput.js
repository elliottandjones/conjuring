import React from "react";

import "./MessageInput.css";

const MessageInput = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="message-input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    <button className="send" onClick={e => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default MessageInput;
