import React from "react";
import Chat from "./Chat";
import LoginForm from "./LoginForm/LoginForm";
import { CTX } from '../../Store';

const ChatPanel = () => {
  const context = React.useContext(CTX);
	const [text, setText] = React.useState("");
  const [proceed, setProceed] = React.useState(false);
  
  
  const handleSubmit = (e, name, room) => {
    e.preventDefault();
    console.log(context);
    context.joinRoom({name, room});
    setProceed(true);
  };

	return (
    <React.Fragment>
      {
        !proceed ?
          <LoginForm handleSubmit={handleSubmit} />
          : (
              <Chat
                text={text}
                setText={setText}
                username={context.username}
                room={context.room}
                users={context.users}
                messages={context.messages}
                sendMessage={context.sendMessage}
                sendRollMessage={context.sendRollMessage}
                />
          )
      }
    </React.Fragment>
	);
};

export default ChatPanel;
