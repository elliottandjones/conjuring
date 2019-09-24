import React from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./Drawer.css";

const Drawer = props => {
	return (
		<div id="drawer-wrapper" className="drawer-wrapper">
			<div id="drawer" className="drawer">
				<Room name={props.name} />
				<Chat creature={props.creature} />
			</div>
		</div>
	);
};

export default Drawer;
