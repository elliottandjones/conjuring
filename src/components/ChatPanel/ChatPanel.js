import React, { useState, useEffect } from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./ChatPanel.css";
import io from "socket.io-client";

const socketUrl = "http://localhost:3121";

export default function ChatPanel({ room, player, action, displayAction }) {
	const [messageCount, setMessageCount] = useState(0);
	const [socket, setSocket] = useState(null);
	const [inRoom, setInRoom] = useState(false);

	useEffect(() => {
		if (inRoom) {
			console.log();
		}
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
	const handleInRoom = () => {
		inRoom ? setInRoom(false) : setInRoom(true);
	};
	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				<Room room={room} player={player} />
				<Chat creature={player.creature} action={action} displayAction={displayAction} />
			</div>
		</div>
	);
}
