import React from 'react';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {

	return (
		<form className="chat-input-form" onSubmit={e => sendMessage(e)}>
			<input
				className="input chat-input"
				required
				type="text"
				placeholder="Type a message..."
				value={message}
				onChange={({ target: { value } }) => setMessage(value)}
				onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
			/>
			<button
				className="send-btn send-message-button"
				type="submit"
				disabled={!message || (message.trim() === "") ? true : false}
			>Send
			</button>
		</form>
	)
}

export default Input;