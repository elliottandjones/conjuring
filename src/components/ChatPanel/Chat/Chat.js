import queryString from 'query-string';
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { CTX } from '../../../Store';
import './Chat.css';
import ChatHeader from './ChatHeader/ChatHeader';
import Input from './Input/Input';
import MessageList from './MessageList/MessageList';
import Sidebar from './Sidebar/Sidebar';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {proceed, action, creatureName, clearRollState} = useContext(CTX);
  // const ENDPOINT = 'http://localhost:5016';
	const ENDPOINT = 'https://whispering-brook-74854.herokuapp.com/';
	
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
      // console.log(users);
      setUsers(users);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])
  
  useEffect(() => {
    // console.log("[from Chat.js] proceed: ", proceed);
    if(proceed) {
      socket.emit('sendRollMessage', {creatureName, action}, () => clearRollState());
    }
    
  }, [proceed, creatureName, action, clearRollState]);

  const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
	}
	
  return (
    <div className="panel-wrapper">
      <div className="panel">
				<ChatHeader room={room} className="header"/>
				<Sidebar users={users} clientName={name} className="sidebar"/>
				<MessageList messages={messages} clientName={name} className="output"/>
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} className="input" />
      </div>
    </div>
  );
}

export default Chat;
