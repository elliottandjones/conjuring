import React from "react";

export default function Messages(props) {
  const { messages, user, typingUsers } = props;
  const messagesRef = React.useRef(null);

  React.useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.scrollHeight;
  });

	return (
		<div ref={messagesRef}>
      {
        messages.messages.map((msg, i) => {
          return (
						<div key={msg.id} className={`msg ${msg.sender === user.name && 'right'}`}>
							<p>
								<span className="msg-name">{msg.sender}</span>
								<span className="msg-time">{msg.time}</span>
							</p>
							<p>{msg.message}</p>
						</div>
					);
        })
      }
      <div>
        {
          typingUsers.map((name) => {
            return (
              <div key={name} className="typing-user">
                {`${name} is typing...`}
              </div>
            );
          })
        }
      </div>
    </div>
	);
};

