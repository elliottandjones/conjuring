import React from 'react';

import Chat from './Chat/Chat/Chat';
import Join from './Chat/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";

const ChatPanel = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default ChatPanel;