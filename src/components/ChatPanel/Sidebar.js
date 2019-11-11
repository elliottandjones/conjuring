import React from 'react';

export default function Sidebar(props) {
  const { user, activeChat, setActiveChat, chats, logout } = props;
  let chatRef = React.createRef();
  return (
		<div id="sidebar">
			<h2>{activeChat}</h2>
			<hr />
      <div 
        className="users"
        ref={chatRef}
        onClick={e => { (e.target = chatRef.current) && setActiveChat(null)}}
        >
        {
          chats.map((chat) => {
            if (chat.name) {
              const user = chat.users.find(({name}) => {
                return name !== user.name
              }) || {name:"Local Tavern"};
              const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';

              return (
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={() => {setActiveChat(chat)}}
								  >
									<p>{user.name}</p>
								</div>
							);
            }
            return null;
          })
        }
      </div>
      <div className="current-user">
        current user:{user.name}
      </div>
      <div 
        className="logout"
        onClick={() => {logout()}}
        title="Logout"
        >LOGOUT</div>
		</div>
	);
}