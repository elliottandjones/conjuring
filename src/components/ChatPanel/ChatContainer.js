import React from 'react';
import { MESSAGE_SENT, MESSAGE_RECIEVED, TYPING, PARTY_CHAT } from '../../Events';
import Sidebar from './Sidebar';
import Messages from './Messages';
import MessageInput from './MessageInput';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null
    }
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.emit(PARTY_CHAT, this.resetChat);
  }

  resetChat = (chat) => {
    return this.addChat(chat, true);
  }

  addChat = (chat, reset) => {
    const { socket } = this.props;
    const { chats, activeChat } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({chats: newChats, activeChat: reset ? chat : activeChat});

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.id));
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  }

  addMessageToChat = (chatId) => {
    return message => {
      const {chats} = this.state;
      let newChats = chats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages.push(message);
        }
        return chat;
      });
      this.setState({chats:newChats});
    }
  }
  updateTypingInChat = (chatId) => {
    return ({isTyping, user}) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;
        let newChats = chats.map((chat) => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          console.log("CHAT: ",chat, chat.users);
          return chat;
        });
        this.setState({chats:newChats});
      }
    }
  }

  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, {chatId, message});
  }

  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, {chatId, isTyping});
  }

  setActiveChat = (activeChat) => {
    console.log("ACTIVECHAT: ",activeChat);
    this.setState({activeChat});
  }
  
  render() {
    const { chats, activeChat } = this.state;
    const { user, logout } = this.props;
    return (
			<div id="panel" className="panel">
				<Sidebar user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} chats={chats} logout={logout} />
				{activeChat !== null ? (
					<div id="chat" className="chat">
						<div id="chat-out" className="chat-messages">
							<Messages messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers} />
						</div>
						<MessageInput
							sendMessage={message => {
								this.sendMessage(activeChat.id, message);
							}}
							sendTyping={isTyping => {
								this.sendTyping(activeChat.id, isTyping);
							}}
						/>
					</div>
				) : (
					<div id="chat" className="chat">
            <h2>activeChat is null, argh</h2>
          </div>
				)}
			</div>
		);
  }
  
}

