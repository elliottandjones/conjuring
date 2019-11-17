import React from "react";
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../../Events';
import LoginForm from "./LoginForm";
import Chat from "./Chat";
import "./ChatPanel.css";

const socketUrl = "http://localhost:3061";
export default class ChatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    };
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => console.log("Connected!"));
    this.setState({socket});
  }

  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({user});
  }
  
  logout = (user) => {
    const { socket } = this.state;
    socket.emit(LOGOUT, user);
    this.setState({user:null});
  }

  
  render() {
    const { socket, user } = this.state;
    return (
			<div id="panel-wrapper" className="panel-wrapper">
        {
          !user ? 
            <LoginForm socket={socket} setUser={this.setUser} /> 
            : <Chat 
                socket={socket} 
                user={user}
                logout={this.logout}
                />
        }
			</div>
		);
  }
}
