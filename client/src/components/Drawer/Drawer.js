import React from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./Drawer.css";

const Drawer = ({ room, player, action, displayAction }) => {
	return (
		<div id="drawer-wrapper" className="drawer-wrapper">
			<div id="drawer" className="drawer">
				<Room room={room} player={player}/>
				<Chat creature={player.creature} action={action} displayAction={displayAction} />
			</div>
		</div>
	);
};

export default Drawer;