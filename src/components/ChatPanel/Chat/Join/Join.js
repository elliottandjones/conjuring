import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Join.css';


export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className="login-wrapper">
      <section className="login">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <h1 className="form-header">Join a Chat Room</h1>
          <label htmlFor="nickname">Nickname</label>
          <input
            required
            name="nickname"
            autoComplete={"true"}
            placeholder="e.g. Pogo Jack"
            className="input-login inp-hvr too-hot"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="room">Room</label>
          <input
            required
            name="room"
            autoComplete={"true"}
            placeholder="e.g. ROFLROOM"
            className="input-login inp-hvr too-hot"
            value={room}
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
          <Link
            id="join-room"
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="login-button ma1 pa1" type="submit" disabled={!name || !room ? true : false}>
              log in
            </button>
          </Link>
        </form>
      </section>
      <footer id="join-footer">
        &copy; 2021 <a href="http://elliottandjones.com/">Elliott Jones</a>
      </footer>
    </div>
  )
}
