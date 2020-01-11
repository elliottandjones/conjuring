import React from 'react';
// import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import RollMessage from './Message/RollMessage';
import './MessageList.css';


const MessageList = ({ messages, clientName }) => {
  
  React.useEffect(() => {
    if(messages[0]) {
    console.log("[last message] isAction: ", messages[messages.length - 1].isAction);
    console.log("[last message] clientName: ", clientName);
    console.log("[last message] createdAt: ", messages[messages.length - 1].creeatedAt);
    console.log("[last message] message.name: ", messages[messages.length - 1].name);
    } else {
      console.log("messages is empty");
    }
  }, [messages, clientName]);

  return (
    <div id="messages" className="messages">
      {messages.map((message, index) => (
        <div key={`message_${index}`} className="">
          {
            message ?
              (!message.isAction ?
                <Message message={message} clientName={clientName}/>
                : <RollMessage message={message} clientName={clientName}/>)
              : null
          }
        </div>
      ))}
    </div>
  );
};

export default MessageList;
      // <ScrollToBottom mode="bottom">
      // </ScrollToBottom>