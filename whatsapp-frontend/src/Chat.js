import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./Chat.css";
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, MicNone} from "@material-ui/icons";
import axios from "./axios";

function Chat({message}) {

  const [input ,setInput] = useState("")

  const sendMessage = async(e) => {
    e.preventDefault()

   await axios.post('/messages/new',{
      message: input,
      name: "Demo app",
      timeStamp:"just now",
      received: false
  })
  setInput('');
  }


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at....</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {message.map(message => (
              <p className={`chat__message ${message.received && "chat__reciever"}`} >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timeStamp}</span>
            </p>
        ))}
      
        
      </div>

    <div className="chat__footer">
        <InsertEmoticon/>
        <form action="">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message." />
            <button onClick={sendMessage} type="submit" >Send a message</button>
        </form>
        <MicNone/>
    </div>

    </div>
  );
}

export default Chat;
