import React from 'react';

const Sidebar = ({ room, users }) => {
  return (
    <div id="sidebar">
      <h2>{room}</h2>
      <hr/>
      <p>{users}</p>
    </div>
  );
};

export default Sidebar;