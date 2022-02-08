import React from "react";

const SidebarLinks = ({ Icons, name, showName, active, sidebarClickItem }) => {
  const isActive = name;

  return (
    <li className="group" onClick={() => sidebarClickItem(name)}>
      <a href={name.toLowerCase()}>
        <div
          className={`flex items-center hover:bg-indigo-700 hover:text-white rounded-full pl-3 py-3 
        ${isActive === name ? "text-gray-500" : ""}
        `}
        >
          <span className="mt-2">
            <Icons />
          </span>
          <span className="ml-3 font-bold mt-1">
            {showName ? showName : name}
          </span>
        </div>
      </a>
    </li>
  );
};

export default SidebarLinks;

{
  /* <HomeIcon></HomeIcon>
      <ExploreIcon></ExploreIcon>
      <NotificationIcon></NotificationIcon>
      <AgendaIcon></AgendaIcon>
      <SaveIcon></SaveIcon>
      <WeatherIcon></WeatherIcon>
      <UserIcon></UserIcon>
      <MoreInfoIcon></MoreInfoIcon> */
}
