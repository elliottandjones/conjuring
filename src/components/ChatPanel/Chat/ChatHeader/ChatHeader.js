import React from 'react';
import { Link } from 'react-router-dom';
import './ChatHeader.css';

export default function ChatHeader({ room }) {
	return (
		<div className="chat-header header">
			<div className="left-wrapper">
				<h4>{room}</h4>
			</div>
			<div className="right-wrapper">
				<Link to="/" title="leave this chatroom">
					&times;
				</Link>
			</div>
		</div>
	);
}


// todo: replace with <Link to="/join"> Component
	// ? because "/" causes page reload && repeats data fetching in App.js (in componentDidMount)
// todo: create new "/join" route and specify it in <ChatPanel> as well

//<a 
//	href="/" 
//	title="leave this chatroom"
//	>&times;
//</a>