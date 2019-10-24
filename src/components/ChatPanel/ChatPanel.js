import React, { useState, useEffect } from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./ChatPanel.css";
import io from "socket.io-client";
import { USER_CONNECTED } from "../../Events";

const socketUrl = "http://localhost:3121";

export default function ChatPanel({ room, action, displayAction }) {
	// const [messageCount, setMessageCount] = useState(0);
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState([]);

	useEffect(() => {
    initSocket();
    
		if (inRoom) {
			console.log("joining room");
			socket.emit("room", { room: "test-room" });
		}
    
    return () => {
      if (inRoom) {
        console.log("leaving room");
        
      }
    }
	});

	// connects to and initializes the socket
	const initSocket = () => {
		const socket = io(socketUrl);
		socket.on("connect", () => {
			console.log("CONNECTED!");
		});
		setSocket(socket);
  };
  const setUser = (user) => {
    socket.emit(USER_CONNECTED);
    setUser(user);
  };

	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				<Room room={room} user={user} />
				<Chat creature={user.creature} action={action} displayAction={displayAction} />
			</div>
		</div>
	);
}
