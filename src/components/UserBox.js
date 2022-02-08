import React from "react";

const UserBox = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div className="flex justify-start items-center- mb-6 hover:bg-indigo-500 cursor-pointer rounded-full py-2 px-4 transform transition-colors duration-200">
      <img
        className="rounded-full w-12 h-12"
        src={user?.avatar}
        alt="Profile"
      />
      <div className="flex flex-col ml-3 text-gray-500 hover:text-white ">
        <span className="font-bold text-md">{user?.displayName}</span>
        <span className="text-sm">@{user?.username}</span>
      </div>
      {/* <div className="flex space-x-1 ml-8 mt-5">
        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
      </div> */}
    </div>
  );
};

export default UserBox;
