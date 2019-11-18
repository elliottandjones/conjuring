import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./Chat";
import LoginForm from "./LoginForm/LoginForm";

const ChatPanel = () => {
	return (
		<Router>
			<Route path="/" exact component={LoginForm} />
			<Route path="/chat" component={Chat} />
		</Router>
	);
};

export default ChatPanel;
