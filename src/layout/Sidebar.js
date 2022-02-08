import React, { useState } from "react";
import { signOut, getAuth } from "firebase/auth";
import PostModal from "../components/PostModal";
import SidebarLinks from "../components/SidebarLinks";
import UserBox from "../components/UserBox";
import {
  ExploreIcon,
  HomeIcon,
  NotificationIcon,
  ToDoComponentIcon,
  SaveIcon,
  WeatherIcon,
  UserIcon,
  SettingsIcon,
  DonateIcon,
} from "../icons/Icons";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";

const sideLinks = [
  {
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Explore",
    icon: ExploreIcon,
  },
  {
    name: "Donate",
    icon: DonateIcon,
  },
  {
    name: "ToDoComponent",
    showName: "To Do List",
    icon: ToDoComponentIcon,
  },
  {
    name: "Saves",
    showName: "Saved",
    icon: SaveIcon,
  },
  {
    name: "Weather",
    icon: WeatherIcon,
  },
  {
    name: "Settings",
    showName: "Settings",
    icon: SettingsIcon,
  },
];

const Sidebar = ({ getPosts }) => {
  const [active, setActive] = useState("Home");
  const [modal, setModal] = useState(false);

  const handleSidebarClickItem = () => {
    const auth = getAuth();
    signOut(auth);
    window.location.replace("/login");
  };

  return (
    <div
      className="flex flex-col justify-between w-72 px-2"
      style={{
        background: "#00071c",
        borderRight: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      <div>
        <div
          className="mt-6 mb-3 ml-2 flex items-center h-12  "
          style={{
            marginTop: "25px",
            borderBottom: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <img
            src={_Post_Blog_Logo}
            alt=""
            className="w-10 h-10 rounded-full mb-4 object-contain"
          ></img>
          <span className="ml-3 font-serif font-bold italic hover:not-italic mb-4 text-white">
            Posting Blog
          </span>
        </div>
        <nav className="mb-4">
          <ul>
            {sideLinks.map(({ name, showName, icon }) => (
              <SidebarLinks
                key={name}
                showName={showName}
                name={name}
                Icons={icon}
                active={active}
              ></SidebarLinks>
            ))}
          </ul>
        </nav>
        <button
          className="bg-indigo-700 text-white hover:bg-indigo-500 shadow-lg rounded-full py-3 px-8 w-full transform transition-colors duration-200"
          onClick={() => {
            setModal(true);
          }}
        >
          Post
        </button>
      </div>
      {/* <div clasName="w-full text-xl" onClick={() => handleSidebarClickItem()}>
        Logout
      </div> */}

      <div>
        <UserBox></UserBox>{" "}
        <button
          onClick={() => handleSidebarClickItem()}
          type="button"
          className="bg-red-800 text-white hover:bg-red-600 shadow-lg rounded-full py-3 px-8 w-full transform transition-colors duration-200 mb-6 "
        >
          Log Out
        </button>
      </div>

      {modal && <PostModal setModal={setModal} getPosts={getPosts}></PostModal>}
    </div>
  );
};

export default Sidebar;
