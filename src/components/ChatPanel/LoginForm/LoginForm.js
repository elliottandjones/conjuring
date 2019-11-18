import React from 'react';
import { Link } from "react-router-dom";

import './LoginForm.css';

export default function LoginForm() {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");

  return (
    <div className="login-wrapper">
      <div className="login">
        <h1 className="form-header">Join a Room</h1>
        <label htmlFor="name">Name</label>
        <input
          className="input-login"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete={true}
          required
          onChange={e => setName(e.target.value)}
          />
        <label htmlFor="room">Room</label>
        <input
          className="input-login"
          type="text"
          name="room"
          placeholder="Room"
          autoComplete={true}
          required
          onChange={e => setRoom(e.target.value)}
          />
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="button" type="submit">Join</button>
        </Link>
      </div>
    </div>
  );
}