import React from 'react';

import './LoginForm.css';

export default function LoginForm({handleSubmit}) {
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");

  return (
    <div className="login-wrapper">
      <form onSubmit={(e) => handleSubmit(e, name, room)} className="login">
        <h1 className="form-header">Join a Room</h1>
        <label htmlFor="name">Name</label>
        <input
          className="input-login"
          type="text"
          name="name"
          placeholder="Name"
          autoComplete={true}
          required
          value={name}
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
          value={room}
          onChange={e => setRoom(e.target.value)}
          />
          <button className="button" type="submit">Join</button>
      </form>
    </div>
  );
}