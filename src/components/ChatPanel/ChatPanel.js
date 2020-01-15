import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from './Chat/Chat';
import Join from './Chat/Join/Join';



const ChatPanel = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      {/* <Route path="/" exact component={Join} /> */}
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default ChatPanel;