import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import LoginForm from "./LoginForm";
import "./ChatPanel.css";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT } from "./utils/events";

const socketUrl = "http://localhost:3121";

export default function ChatPanel({ room, action, displayAction }) {
	// const [messageCount, setMessageCount] = useState(0);
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
    initSocket();
	});

	// connects to and initializes the socket
	const initSocket = () => {
		const socket = io(socketUrl);
		socket.on("connect", () => {
			console.log("CONNECTED!");
		});
		setSocket(socket);
  };
  const initUser = (user) => {
    socket.emit(USER_CONNECTED);
    setUser(user);
  };
  const onLogout = () => {
    socket.emit(LOGOUT);
    setUser(null);
    setSocket(null);
  };

	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				{(!user) ? (
					<LoginForm socket={socket} initUser={initUser} />
				) : (
					<React.Fragment>
						<Sidebar room={room} users={[...user]} />
						<Chat creature={user.creature} action={action} displayAction={displayAction} />
					</React.Fragment>
				)}
			</div>
		</div>
	);
}
