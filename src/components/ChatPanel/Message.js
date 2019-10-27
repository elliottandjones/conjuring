import React from "react";

const Message = props => {
	return (
		<div className="message">
			<p>
				<span className="message__name">{props.username}</span>
				<span className="message__meta">{props.createdAt}</span>
			</p>
			<p>{props.message}</p>
		</div>
	);
};

export default Message;
