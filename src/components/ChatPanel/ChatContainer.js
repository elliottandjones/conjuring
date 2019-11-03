import React from 'react';
import { MESSAGE_SENT, MESSAGE_RECIEVED, TYPING, PARTY_CHAT } from '../../Events';
import Messages from './Messages';

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
    this.addChat(chat, true);
  }

  addChat = (chat, reset) => {
    const { socket } = this.props;
    const {chats} = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({chats: newChats});

    const messageEvent = `${MESSAGE_RECIEVED}-${chat-id}`;
    const typingEvent = `${TYPING}-${chat-id}`;

    socket.on(typingEvent)
    socket.on(messageEvent, this.addMessageToChat(chatId))
  }

  addMessageToChat = (chatId) => {
    return message => {
      const {chats} = this.state;
      let newChats = chats.map((chat) => {
        if (chat.id === chatId) {
          chat.messages.push(messageEvent)
        }
        return chat;
      });
      this.setState({chats:newChats});
    }
  }
  updateTypingInChat = (chatId) => {

  }

  sendMessage = (chatId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, {chatId, message});
  }

  sendTyping = (chatId, isTyping) => {
    const socket = this.props;
    socket.emit(TYPING, {chatId, isTyping});
  }

  setActiveChat = (activeChat) => {
    this.setState({activeChat});
  }
  
  render() {
    return (
        <React.Fragment>
          <div id="sidebar">
            <h2>{props.user.room}</h2>
            <hr />
            <p>{props.user.name}</p>
          </div>
          <div id="chat" className="chat">
            <div id="chat-out" className="chat-messages">
              {
                activeChat !== null && <Messages chat={props.chat} />
              }
            </div>
            <div id="chat-in" className="compose">
              <input 
                onChange={e => props.onTextValueChange(e)} 
                type="text" 
                name="message" 
                placeholder="Message" 
                value={props.textValue} 
                required 
                autoComplete="off" 
                />
              <button type="submit">Send</button>
            </div>
          </div>
        </React.Fragment>
    );
  }
  
}

