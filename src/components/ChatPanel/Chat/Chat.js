import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';

import MessageList from '../MessageList/MessageList';
import ChatHeader from '../ChatHeader/ChatHeader';
import Input from '../Input/Input';
import Sidebar from '../Sidebar/Sidebar';
import { CTX } from '../../../../Store';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {action, creatureName, clearRollState} = useContext(CTX);
  // const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
  const ENDPOINT = 'http://localhost:5016';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        console.log(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      console.log(users);
      setUsers(users);

    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  if(creatureName && action) {
    socket.emit('sendRollMessage', {creatureName, action}, () => clearRollState());
  }
  return (
    <div id="panel-wrapper">
      <div id="panel">
          <Sidebar users={users}/>
          <div id="chat">
            <ChatHeader room={room} />
            <div id="chat-out">
              <ScrollToBottom mode="bottom">
                <MessageList messages={messages} name={name} />
              </ScrollToBottom>
            </div>
            <div id="chat-in">
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default Chat;
