import React from 'react';

export default function MessageInput(props) {
  return (
    <div id="chat-in" className="compose">
      <input
        onChange={e => props.onTextValueChange(e)}
        type="text"
        name="message"
        placeholder="Message"
        value={props.textValue}
        required
        autoComplete="off"
      />
      <button type="submit">Send</button>
    </div>
	);
}