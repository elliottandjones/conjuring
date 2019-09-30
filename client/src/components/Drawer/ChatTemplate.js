import React from 'react';

export default function ChatContainer(props) {
  return (
    <React.Fragment>
      <MessageTemplate {...props.messageTemplate} />
      <LocationMessage {...props.locationMessage} />
      <Sidebar {...props.sidebar} />
    </React.Fragment>
  );
}

function Sidebar(props) {
  return (
		<div id="sidebar-template">
			<h2 class="room-title">{props.room}</h2>
			<h3 class="list-title">Users</h3>
			<ul class="users">
				{props.users}
				<li>{props.username}</li>
				{props.slashusers}
			</ul>
		</div>
	);
}

function LocationMessage(props) {
  return (
		<div id="location-message-template">
			<div class="message">
				<p>
					<span class="message__name">{props.username}</span>
					<span class="message__meta">{props.createdAt}</span>
				</p>
				<p>
					<a href={props.url} target="_blank">
						My current location
					</a>
				</p>
			</div>
		</div>
	);
}

function MessageTemplate(props) {
  return (
    <div id="message-template">
      <div class="message">
        <p>
          <span class="message__name">{props.username}</span>
          <span class="message__meta">{props.createdAt}</span>
        </p>
        <p>{props.message}</p>
      </div>
    </div>
  );
}