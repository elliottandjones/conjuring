import React from 'react';

import "./Sidebar.css";

const Sidebar = ({ users }) => (
	<div id="sidebar">
		{users ? (
			<ul className="name-list">
				{users.map(({ name }) => (
					<li key={`activeUser_${name}`} className="name-list-item">
						<p>{name}</p>
					</li>
				))}
				<li className="name-list-item-count">
					Users present: <span>{users.length}</span>
				</li>
			</ul>
		) : null}
	</div>
);

export default Sidebar;