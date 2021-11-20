import React from "react";
import "./SideBar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton, Avatar } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from "./SidebarChat";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Daniel_Craig_-_Film_Premiere_%22Spectre%22_007_-_on_the_Red_Carpet_in_Berlin_%2822387409720%29_%28cropped%29.jpg" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
          <div className="searchbar__searchContainer">
            <SearchIcon/>
            <input type="text" placeholder="Search or start new chat" />
          </div>
      </div>

      <div className="sidebar__chats">
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
      </div>
    </div>
  );
}

export default SideBar;
