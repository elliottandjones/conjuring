import React from 'react';

import "./Sidebar.css";

const Sidebar = ({ users }) => (
	<div id="sidebar">
    online
    <hr />
		{users ? (
			<ul className="name-list">
				{users.map(({ name }) => (
					<li key={`activeUser_${name}`} className="name-list-item">
						<p>{name}</p>
					</li>
				))}
			</ul>
		) : null}
	</div>
);

export default Sidebar;