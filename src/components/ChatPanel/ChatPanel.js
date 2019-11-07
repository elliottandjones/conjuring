import React from "react";
import io from 'socket.io-client';
import LoginForm from "./LoginForm";
import { 
  USER_CONNECTED,
  LOGOUT
} from '../../Events';
import "./ChatPanel.css";
import ChatContainer from "./ChatContainer";

const socketUrl = "http://localhost:3001";
export default class ChatPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null,
      // textValue: ""
    };
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log("Connected!");
    });
    this.setState({socket});
  }

  setUser = (user, room) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user, room);
    this.setState({user, room});
  }

  // onTextValueChange = (e) => {
  //   this.setState({textValue: e.target.value});
  // }
  
  logout = (user) => {
    const { socket } = this.state;
    socket.emit(LOGOUT, user);
    this.setState({user:null});
  }

  
  render() {
    const { socket, user } = this.state;
    return (
			<div id="panel-wrapper" className="panel-wrapper">
				<div id="panel" className="panel">
					{
            !user ? 
              <LoginForm socket={socket} setUser={this.setUser} /> 
              : <ChatContainer 
                  socket={socket} 
                  user={user}
                  logout={this.logout}
                  />
          }
				</div>
			</div>
		);
  }
}
