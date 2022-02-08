import React from "react";
import PostingBlogLogo from "../images/postingblog.png";

const Profile = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-extraLight">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-1">
          Profile
        </span>
        <img
          src={PostingBlogLogo}
          alt=""
          className="w-10 h-10 rounded-t-lg"
        ></img>
      </header>
    </div>
  );
};

export default Profile;
