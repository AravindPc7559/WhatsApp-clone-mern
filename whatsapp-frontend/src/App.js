import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import Pusher from 'pusher-js'
import axios from './axios';

function App() {
  const [message , setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(responce => {
      console.log(responce);
      setMessages(responce.data)
    })
  },[])

  useEffect(()=>{
    var pusher = new Pusher('a3511be92b176b556ab1', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      setMessages([...message , newMessages])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  },[message])

  console.log(message);

  return (
    <div className="app">
      <div className="app__body">
      <SideBar/>
     <Chat message={message} />
      </div>
    </div>
  );
}

export default App;
