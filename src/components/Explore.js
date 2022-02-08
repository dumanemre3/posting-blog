import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import Widgets from "../layout/Widgets";
import React, { useState } from "react";
import { ExploreIcon } from "../icons/Icons";
import { Timeline } from "react-twitter-widgets";
import ErrorForWidgets from "../components/ErrorForWidgets";
import ExploreLeft from "./ExploreForWidgets/ExploreLeft";
import ExploreMiddle from "./ExploreForWidgets/ExploreMiddle";
import ExploreRight from "./ExploreForWidgets/ExploreRight";

const Explore = () => {
  const [search, setSearch] = useState("Medyascopetv");

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2">
          Explore
        </span>
        <img
          src={_Post_Blog_Logo}
          alt=""
          className="w-10 h-10 rounded-t-lg"
        ></img>
      </header>
      <div className="flex justify-between ">
        <ExploreLeft></ExploreLeft>

        <ExploreMiddle></ExploreMiddle>

        <ExploreRight></ExploreRight>
      </div>
    </div>
  );
};

export default Explore;
