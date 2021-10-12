import React from 'react'
import './Input.css'

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="chat-input-form input" onSubmit={e => sendMessage(e)}>
      <input
        className="chat-input"
        required
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyDown={event => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <button className="send-message-button send-btn" type="submit" disabled={!message.trim() ? true : false}>
        Send
      </button>
    </form>
  )
}

export default Input
