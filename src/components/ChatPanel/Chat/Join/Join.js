import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Join.css';


export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className="login-wrapper">
			<section className="login">
				<form className="login-form" onSubmit={e => e.preventDefault()}>
					<h1 className="form-header">Join</h1>
					<label htmlFor="nickname">Nickname</label>
					<input
						required
						name="nickname"
						autoComplete={"true"}
						placeholder="Pogo Jack"
						className="input-login"
						value={name}
						type="text"
						onChange={(e) => setName(e.target.value)}
						/>
					<label htmlFor="room">Room</label>
					<input
						required
						name="room"
						autoComplete={"true"}
						placeholder="rofl_room"
						className="input-login"
						value={room}
						type="text"
						onChange={(e) => setRoom(e.target.value)}
						/>
					<Link id="join-room" onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
						<button className={'send-message-button'} type="submit">Sign In</button>
					</Link>
				</form>
			</section>
    </div>
  );
}

// export default Join;