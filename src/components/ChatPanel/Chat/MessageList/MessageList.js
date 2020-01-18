import React from 'react';
import Message from './Message/Message';
import RollMessage from './Message/RollMessage';
import './MessageList.css';

export default function MessageList({ messages, clientName }) {
	const bottomRef = React.useRef(null);
	const scrollToBottom = () => {
		bottomRef.current.scrollIntoView({behavior: "smooth"});
	};
	React.useEffect(scrollToBottom, [messages]);
	// element.offsetBottom = element.offsetTop + element.offsetHeight

  return (
    <div className="messages" style={{overflowY: 'scroll', overflowX: 'hidden'}}>
      {messages.map((message, index) => (
        <div key={`message_${index}`}>
          {
            message ?
              (!message.isAction ?
                <Message message={message} clientName={clientName}/>
                : <RollMessage message={message} clientName={clientName}/>)
              : null
          }
        </div>
      ))}
			<div ref={bottomRef} className="bottom" id="bottom"/>
    </div>
  );
}
