import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className="login-wrapper">
      <h1 className="form-header">Join</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="name">Name
          <input
            required
            name="name"
            autoComplete={"true"}
            placeholder="Name"
            className="input-login"
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
        </label>
        <label htmlFor="room">Room
          <input
            required
            name="room"
            autoComplete={"true"}
            placeholder="Room"
            className="input-login"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            />
        </label>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button'} type="submit">Sign In</button>
        </Link>
      </form>
    </div>
  );
}

export default Join;