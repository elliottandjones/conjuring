import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const socketUrl = ":5061";

export default function Store(props) {
  const socketState = React.useState(io(socketUrl));
  // if (!socket) {
  //   setSocket(io(socketUrl));
  // }
  return (
    <CTX.Provider value={socketState}>
      {props.children}
    </CTX.Provider>
  );
}