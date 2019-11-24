import React from "react";
import Chat from "./Chat";
import LoginForm from "./LoginForm/LoginForm";
import useChat from "../../hooks/useChat";


const ChatPanel = () => {
  const { messages, room, name, users, sendMessage, sendRollMessage, joinRoom } = useChat();
  const [proceed, setProceed] = React.useState(false);
  
  
  const handleSubmit = (e, username, room) => {
    e.preventDefault();

    joinRoom(username, room)
    setProceed(true);
  };

	return (
    <React.Fragment>
      {
        !proceed ?
          <LoginForm handleSubmit={handleSubmit} />
          : (
              <Chat
                name={name}
                room={room}
                users={users}
                messages={messages}
                sendMessage={sendMessage}
                sendRollMessage={sendRollMessage}
                />
          )
      }
    </React.Fragment>
	);
};

export default ChatPanel;
