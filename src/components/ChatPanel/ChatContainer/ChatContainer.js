import React from 'react';
import useLocalStorage from 'react-use-localstorage';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import { useOnlineStatus, useWindowSize } from '@withvoid/melting-pot';
import useClippy from 'use-clippy';

import '../Chat.css';

const Messages = props => { 
  const [ clipboard, setClipboard ] = useClippy();

  return props.data.map((m, index) =>
		m[0] !== "" ? (
			<li key={`messages_${m[0]}_${index}`}>
				<strong>{m[0]}</strong> :
				<button
					onClick={(event) => {
            event.preventDefault();
						setClipboard(`${m[1]}`);
					}}
					href="#"
				>
					<i style={{ float: "right", color: "black" }} className=" material-icons">
						content_copy
					</i>
				</button>{" "}
				<div className="innermsg">{m[1]}</div>
			</li>
		) : <li key={`messages_${m[0]}_${index}`} className="update">{m[1]}</li>
	); 
}

const Online = props => props.data.map((m, index) => <li key={`${index}_is_online`}  id={m[0]}>{m[1]}</li>)

export default () => {
  const [room, setRoom] = useLocalStorage('room','');
  const [id, setId] = useLocalStorage('id', '');

  const [socket] = useSocket('https://open-chat-naostsaecf.now.sh');

  const [messages, setMessages] = useImmer([]);

  const [onlineList, setOnline] = useImmer([]);

  const { online } = useOnlineStatus();
  const { width } = useWindowSize();

  React.useEffect(()=>{
    socket.connect();

    if(id){
      socket.emit('join',id,room);
    }

    socket.on('message que',(nick,message) => {
      setMessages(draft => {
        draft.push([nick,message])
      })
    });

    socket.on('update',message => setMessages(draft => {
      draft.push(['',message]);
    }))

    socket.on('people-list',people => {
      let newState = [];
      for(let person in people){
        newState.push([people[person].id,people[person].nick]);
      }
      setOnline(draft=>{draft.push(...newState)});
    });

    socket.on('add-person',(nick,id)=>{
      setOnline(draft => {
        draft.push([id,nick])
      })
    })

    socket.on('remove-person',id=>{
      setOnline(draft => draft.filter(m => m[0] !== id))
    })

    socket.on('chat message',(nick,message)=>{
      setMessages(draft => {draft.push([nick,message])})
    })
  },0);

  // const addToInput = () => {
  //   const input = document.getElementById('m');
  //   if(input.value.trim() !== '') {
  //     input.value = clipboard;
  //   }
  // }

  const handleSubmit = e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const room_value = document.getElementById('room').value.trim();
    console.log(name);
    if (!name) {
      return alert("Name can't be empty");
    }
    setId(name);
    setRoom(room_value);
    socket.emit("join", name,room_value);
  };

  const handleSend = e => {
    e.preventDefault();
    const input = document.getElementById('m');
    if(input.value.trim() !== ''){
      socket.emit('chat message',input.value,room);
      input.value = '';
    }
  }

  const logOut = () => {
    socket.disconnect();
    setOnline(draft=>[]);
    setMessages(draft=>[]);
    setId('');
    socket.connect();
  }

  return id !== '' ? (
    <section style={{display:'flex',flexDirection:'row'}} >
      <ul id="messages"><Messages data={messages} /></ul>
      <ul id="online"> <button onClick={()=>logOut()} href='#'><div style={{float:'right'}}>❌</div></button> {online ? 'You are Online' : 'You are Offline'} <hr/><Online data={onlineList} /> </ul>
      <div id="sendform">
        <form onSubmit={e => handleSend(e)} style={{display: 'flex'}}>
            <input id="m" />
            {width > 1000 ? <button style={{width:'100px'}} type="submit">Send Message</button> :
          <button style={{width:'50px'}}><i style={{fontSize:'15px'}} className="material-icons">send</i></button>}
        </form>
      </div>
    </section>
  ) : (
    <div style={{ textAlign: 'center', margin: '30vh auto', width: '70%' }}>
      <form onSubmit={event => handleSubmit(event)}>
        <input id="name" required placeholder="What is your name .." /><br />
        <input id="room" placeholder="What is your room .." /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};