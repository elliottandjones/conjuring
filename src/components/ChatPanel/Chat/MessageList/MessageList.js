import React from 'react';

// import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import RollMessage from './RollMessage/RollMessage';

import './MessageList.css';

const MessageList = ({ messages, name }) => {
  React.useEffect(() => {
    console.log("[last message] isAction: ", messages[messages.length - 1].isAction);
    console.log("[last message] name: ", name);
  }, [messages, name]);

  return (
    <div id="messages" className="messages">
      {messages.map((message, index) => (
        <div key={`message_${index}`} className="">
          {
            !message.isAction ?
              <Message message={message} name={name}/>
              : <RollMessage message={message} name={name}/>
          }
        </div>
      ))}
    </div>
  );
};

export default MessageList;
      // <ScrollToBottom mode="bottom">
      // </ScrollToBottom>