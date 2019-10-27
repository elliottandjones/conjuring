import React from 'react';

const Sidebar = ({ rooms, users }) => {
  return (
    <div id="sidebar">
      <h2>{rooms}</h2>
      <hr/>
      <p>{users}</p>
    </div>
  );
};

export default Sidebar;