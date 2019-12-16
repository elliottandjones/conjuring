import React from "react";

import './Loader.css';

const Loader = () => (
	<div className="container">
		<div id="loader">
			{/* <span>Loading</span> */}
			<span>.</span>
			<span>.</span>
			<span>.</span>
		</div>
	</div>
);

export default Loader;
