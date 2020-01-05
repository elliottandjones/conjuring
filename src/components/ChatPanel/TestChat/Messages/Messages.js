import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import RollMessage from './RollMessage/RollMessage';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <div id="messages-wrapper">
    <ScrollToBottom mode="bottom" className="messages">
      {messages.map((message, index) => (
        <div key={`message_${index}`} className="">
          {
            !message.isAction ?
              <Message message={message} name={name}/>
              : <RollMessage message={message} name={name}/>
          }
        </div>
      ))}
    </ScrollToBottom>
  </div>
);

export default Messages;