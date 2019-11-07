import React from 'react';

const Sidebar = ({user, activeChat, setActiveChat, chats, logout }) => {
  const chatRef = React.useRef(null);
  return (
		<div id="sidebar">
			<h2>{user.room}</h2>
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
              }) || {name:"Party"};
              const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';

              return (
								<div
									key={chat.id}
									className={`user ${classNames}`}
									onClick={() => setActiveChat(chat)}
								  >
									<p>{user.name}</p>
								</div>
							);
            }
            return null;
          })
        }
      </div>
      <div 
        className="logout"
        onClick={() => logout()}
        title="logout"
        >LOGOUT</div>
		</div>
	);
}

export default Sidebar;