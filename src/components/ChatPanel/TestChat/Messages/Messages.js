import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import RollMessage from './Message/RollMessage';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, index) => (
      <div key={`message_${index}`}>
        {
          !message.isAction ?
            <Message message={message} name={name}/>
            : <RollMessage message={message} naame={name}/>
        }
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;