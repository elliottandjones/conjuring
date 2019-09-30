import React from 'react';

const Room = ({ room, player }) => {
  return (
    <div id="room">
      <h2>{room}</h2>
      <hr/>
      <p>{player}</p>
    </div>
  );
};

export default Room;