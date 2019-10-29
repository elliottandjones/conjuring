import React from "react";
import { CTX } from "../../Store";

import "./ChatPanel.css";

export default function ChatPanel(props) {
  // CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const rooms = Object.keys(allChats);
  console.log({allChats});
  // local state
  const [proceed, setProceed] = React.useState(false);
  const [room, setRoom] = React.useState(rooms[0]);
  const [username, setUsername] = React.useState("");
  const [textValue, setTextValue] = React.useState("");
  
  const onProceedToRoom = (e) => {
    e.preventDefault();
    setUsername(e.target.value)
    setRoom(rooms[0]);
    setProceed(true);
  };

  const handleSendClick = () => {
    sendChatAction({from: user, msg: textValue, room: room});
    setTextValue("");
  };

	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				<div id="sidebar">
					<h2>{room}</h2>
					<hr />
					<p>{users}</p>
				</div>
				{!proceed ? (
					<div className="login">
						<h1 id="form-header">Join a Room</h1>
						<form	onSubmit={e => onProceedToRoom(e)}	id="login-form">
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
							<input 
                type="text" 
                id="room" 
                name="room" 
                placeholder="Room" 
                required 
                value={room} 
                onChange={e => setRoom(e.target.value)} 
                
                />
							<button type="submit">Join</button>
						</form>
					</div>
				) : (
					<div className="chat">
			      <div className="chat-main">
				      <div id="messages" className="chat-messages"></div>
				      <div className="compose">
                <input onChange={e => setTextValue(e.target.value)} type="text" name="message" placeholder="Message" required autocomplete="off" />
                <button onClick={() => handleSendClick()}>Send</button>
				      </div>
			      </div>
		      </div>
				)}
			</div>
		</div>
	);
}
