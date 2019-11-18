import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from 'socket.io-client';

import Chat from "./Chat";
import LoginForm from "./LoginForm/LoginForm";


const ENDPOINT = "http://localhost:5061";

const ChatPanel = ({ action, displayAction }) => {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const s = io(ENDPOINT);
    setSocket(s);
  })
	return (
		<Router>
			<Route path="/" exact render={() => <LoginForm socket={socket} />} />
			<Route path="/chat" render={() => <Chat action={action} displayAction={displayAction} socket={socket} endpoint={ENDPOINT}/>} />
		</Router>
	);
};

export default ChatPanel;
