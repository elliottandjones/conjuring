import React from 'react';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" title="exit room">&times;</a>
    </div>
  </div>
);

export default InfoBar;