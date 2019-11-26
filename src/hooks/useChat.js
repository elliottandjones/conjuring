import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const [name, setName] = useState("");
	const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
	const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  // let socketUrl = "https://whispering-brook-74854.herokuapp.com/";
  // let socketUrl = "http://localhost:5061";

  useEffect(() => {
    socketRef.current = socketIOClient("https://whispering-brook-74854.herokuapp.com/");
    
    socketRef.current.on(
      "sendMessage",
      ({ message }) => {
        setMessages(messages => [...messages, message]);
      }
    );
    socketRef.current.on(
      "sendRollMessage",
      ({ message }) => {
        setMessages(messages => [...messages, message]);
      }
    );
    socketRef.current.on(
      "joinRoom",
      ({ name, room }) => {
        setName(name);
        setRoom(room);
      }
    );
    socketRef.current.on(
      "roomData", 
      ({ users }) => {
			setUsers(users);
		});

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off();
    };
  },[]);

  const sendMessage = ({ message }) => {
    socketRef.current.emit("sendMessage", { message });
  };
  const sendRollMessage = ({creature, action}) =>{
    socketRef.current.emit("sendRollMessage", { creature, action });
  };
  const joinRoom = ({name, room}) => {
    socketRef.current.emit("join", {name, room}, error => {
      if(error) {
        alert(error);
        console.log(error);
      }
    });
  };
  return { messages, room, name, users, sendMessage, sendRollMessage, joinRoom };
};

export default useChat;
