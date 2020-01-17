import React from 'react';
import Message from './Message/Message';
import RollMessage from './Message/RollMessage';
import './MessageList.css';

export default function MessageList({ messages, clientName }) {
	// const rectRef = React.useRef();
	// React.useEffect(() => {
	// 	console.log("document.getElementById('m').getBoundingClientRect()", document.getElementById('m').getBoundingClientRect());
	// 	console.log("rectRef.current.clientHeight", rectRef.current.clientHeight);
	// }, []);
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
    </div>
  );
}
