import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Store from "./Store";
import "./ChatPanel.css";
import io from "socket.io-client";
import { 
  USER_CONNECTED,
  // LOGOUT 
} from "./utils/events";
import { CTX } from "../../Store";

const socketUrl = "http://localhost:3121";

export default function ChatPanel({ action, displayAction }) {
  // CTX store
  const [allChats] = React.useContext(CTX);
  console.log({allChats});

  const rooms = Object.keys(allChats);
  // local state
  const [proceed, setProceed] = useState(false);
	// const [socket, setSocket] = useState(null);
  // const [user, setUser] = useState(null);
  const [room, setRoom] = useState(rooms[0]);

	useEffect(() => {
    initSocket();
	});

	// connects to and initializes the socket
	// const initSocket = () => {
	// 	const socket = io(socketUrl);
	// 	socket.on("connect", () => {
	// 		console.log("CONNECTED!");
	// 	});
	// 	setSocket(socket);
  // };
  // const initUser = (user) => {
  //   socket.emit(USER_CONNECTED);
  //   setUser(user);
  // };
  const goProceed = (e) => {
    e.preventDefault();
    setRoom(rooms[0]);
    setProceed(true);
  }
  

	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<Store>
				<div id="panel" className="panel">
					<div id="sidebar">
						<h2>{rooms}</h2>
						<hr />
						<p>{users}</p>
					</div>
					{!proceed ? (
						<Dashboard socket={socket} initUser={initUser} goProceed={goProceed} />
					) : (
						<Chat creature={user.creature} action={action} displayAction={displayAction} allChats={allChats} />
					)}
				</div>
			</Store>
		</div>
	);
}
