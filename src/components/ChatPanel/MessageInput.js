import React from 'react';

export default function MessageInput(props) {
  
  return (
    <div id="chat-in" className="compose">
      <form onSubmit={}>
        <input
          type="text"
          name="message"
          placeholder="Message"
          ref={"messageinput"}
          value={}
          required
          autoComplete={"off"}
        />
        <button 
          type="submit"
          className="send"
          disabled={message.length < 1}
        >Send</button>
      </form>
    </div>
  );
}
// <form onSubmit={props.sendMessage}></form>