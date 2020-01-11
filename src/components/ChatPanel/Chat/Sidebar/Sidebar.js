import React from 'react';
import "./Sidebar.css";

export default function Sidebar({ users, clientName }) {
	return (
		<aside className="sidebar">
			<span className="ma1 pt2 pb2">users</span>
			<hr />
			{users ? (
				<ul className="name-list">
					{users.map(({ name }) => (
						<li key={`activeUser_${name}`} className="name-list-item">
							<h4 className={`${name === clientName.trim() && "your-name"}`}>{name}</h4>
						</li>
					))}
				</ul>
			) : null}
		</aside>
	)
}

