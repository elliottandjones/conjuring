import React from 'react';

import Chat from './TestChat/Chat/Chat';
import Join from './TestChat/Join/Join';

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