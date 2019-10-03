import React from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./ChatPanel.css";

const ChatPanel = ({ room, player, action, displayAction }) => {
	return (
		<div id="panel-wrapper" className="panel-wrapper">
			<div id="panel" className="panel">
				<Room room={room} player={player}/>
				<Chat creature={player.creature} action={action} displayAction={displayAction} />
			</div>
		</div>
	);
};

export default ChatPanel;