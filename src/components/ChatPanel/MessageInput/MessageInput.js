import React from "react";

import "./MessageInput.css";

const MessageInput = ({ setText, sendMessage, text }) => (
  <form 
    onSubmit={(e) => {
      e.preventDefault();
      sendMessage(text);
      setText("");
    }} 
    className="form"
  >
    <input
      className="message-input"
      type="text"
      placeholder="Type a message..."
      value={text}
      onChange={({ target: { value } }) => setText(value)}
      onKeyPress={e => (e.key === "Enter" ? sendMessage({text}) : null)}
      />
    <button className="send" type="submit">
      Send
    </button>
  </form>
);

export default MessageInput;
