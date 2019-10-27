import React from "react";
import Chat from "./Chat";
import { CTX } from "../../Store";

import "./ChatPanel.css";

export default function ChatPanel({ action, displayAction }) {
  // CTX store
  const {allChats} = React.useContext(CTX);

  const rooms = Object.keys(allChats);
  console.log({allChats});
  // local state
  const [proceed, setProceed] = React.useState(false);
  const [room, setRoom] = React.useState(rooms[0]);
  const [username, setUsername] = React.useState("");
  
  
  const onProceed = (e) => {
    // e.preventDefault();
    setUsername(e.target.value)
    setRoom(rooms[0]);
    setProceed(true);
  }
  

	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				<div id="sidebar">
					<h2>{rooms}</h2>
					<hr />
					<p>{users}</p>
				</div>
				{!proceed ? (
					<div className="login">
						<h1 id="form-header">Join a Room</h1>
						<form	onSubmit={e => onProceed(e)}	id="login-form">
							<label htmlFor="username">Display name</label>
							<input
								type="text"
								id="username"
								name="username"
								placeholder="Display name"
								required
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
							<label htmlFor="room">Room</label>
							<input type="text" id="room" name="room" placeholder="Room" required value={room} onChange={e => setRoom(e.target.value)} />
							<button type="submit">Join</button>
						</form>
					</div>
				) : (
					<Chat room={room} creature={user.creature} action={action} displayAction={displayAction} allChats={allChats} />
				)}
			</div>
		</div>
	);
}
