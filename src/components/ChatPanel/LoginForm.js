import React from 'react';
import { VERIFY_USER } from '../../Events';

export default function LoginForm(props) {
  const [nameText, setNameText] = React.useState("");
  const [roomText, setRoomText] = React.useState("");
  const [error, setError] = React.useState("");
  
  const setUser = ({ user, isUser }) => {
    console.log(user, isUser);
    if (isUser) {
      setError("Fool--that name is already taken.");
    } else {
      setError("");
      props.setUser(user);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.socket.emit(VERIFY_USER, nameText, setUser);
  }

  return (
    <div className="login">
      <h1 id="form-header">Join a Room</h1>
      <form onSubmit={handleSubmit} id="login-form">
        <label htmlFor="username">Display name</label>
        <input 
          type="text" id="username" 
          name="username" 
          placeholder="Display name" 
          required 
          value={nameText} 
          onChange={e => setNameText(e.target.value)}
          />
        <label htmlFor="room">Room</label>
        <input 
          type="text" 
          id="room" 
          name="room" 
          placeholder="Room" 
          required 
          value={roomText} 
          onChange={e => setRoomText(e.target.value)}
          />
        <button type="submit">Join</button>
        <div className="error">{error}</div>
      </form>
    </div>
  );
}