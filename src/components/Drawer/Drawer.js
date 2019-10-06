import React from "react";
import Room from "./Room";
import Chat from "./Chat";
import "./Drawer.css";

const Drawer = props => {
	return (
		<div id="drawer">
			<Room />
			<Chat />
			<footer id="footer">
				&copy; 2019 <a href="http://elliottandjones.com/" style={{ textDecoration: "none" }}>Elliott Jones</a>
			</footer>
		</div>
	);
};

export default Drawer;
