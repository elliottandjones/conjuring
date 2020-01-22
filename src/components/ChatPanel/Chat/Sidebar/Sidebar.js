import React from 'react';
import "./Sidebar.css";

export default function Sidebar({ users, clientName }) {
	return (
		<aside className="sidebar pa1">
			<p className="ma1">users</p>
			<hr />
			{users ? (
				<ul className="name-list">
					{users.map(({ name }) => (
						<li key={`activeUser_${name}`} className="name-list-item">
							<p className={`${name === clientName.trim() && "your-name"}`}>{name}</p>
						</li>
					))}
				</ul>
			) : null}
		</aside>
	)
}

