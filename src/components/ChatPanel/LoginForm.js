import React from "react";
import { VERIFY_USER } from "./utils/events";

const LoginForm = ({ socket, initUser }) => {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit(VERIFY_USER, username, room, initUser);

    // setUsername(e.target.value)
  };
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setUsername
  // };
  
  return (
		<div className="login">
			<h1 id="form-header">Join a Room</h1>
			<form onSubmit={handleSubmit} id="login-form">
				<label htmlFor="username">Display name</label>
				<input 
          type="text"
          id="username"
          name="username"
          placeholder="Display name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
				<label htmlFor="room">Room</label>
				<input 
          type="text"
          id="room"
          name="room"
          placeholder="Room"
          required
          value={room}
          onChange={(e) => setRoom(e.target.value)}
         />
				<button type="submit">Join</button>
			</form>
		</div>
	);
};

export default LoginForm;
