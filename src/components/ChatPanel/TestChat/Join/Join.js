import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="login-wrapper">
      <h1 className="form-header">Join</h1>
      <div>
        <input 
          placeholder="Name" 
          className="input-login" 
          type="text" 
          onChange={(event) => setName(event.target.value)} 
          autoComplete={'true'}
          />
      </div>
      <div>
        <input 
          placeholder="Room" 
          className="input-login" 
          type="text" 
          onChange={(event) => setRoom(event.target.value)} 
          autoComplete={'true'}
          />
      </div>
      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button className={'button'} type="submit">Sign In</button>
      </Link>
    </div>
  );
}
