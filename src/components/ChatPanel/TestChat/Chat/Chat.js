import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Sidebar from '../Sidebar/Sidebar';
import { CTX } from '../../../../TestStore';

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
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
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
            <InfoBar room={room} />
            <div id="chat-out">
              <Messages messages={messages} name={name} />
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
