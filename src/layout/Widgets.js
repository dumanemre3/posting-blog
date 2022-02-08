import React, { useState } from "react";
import { ExploreIcon } from "../icons/Icons";
import { Timeline } from "react-twitter-widgets";
import ErrorForWidgets from "../components/ErrorForWidgets";

const Widgets = () => {
  const [search, setSearch] = useState("Medyascopetv");
  const [searchText, setSearchText] = useState("");

  return (
    <aside className=" w-80" style={{ background: "#00071c" }}>
      <div
        className="flex items-center space-x-3 p-3 rounded-full focus-within:ring-1 focus-within:ring-primary-base focus-within:text- "
        style={{
          height: "51px",
          margin: "11px",
          background: "#00071c",
          border: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        <ExploreIcon className="w-5 h-5 "></ExploreIcon>
        {/* <input
          type="text"
          placeholder="Search Posting Blog"
          className="placeholder-gray-dark bg-transparent outline-none w-full text-m mb-1"
        /> */}
        <div className="w-100 text-gray-300">
          <input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="placeholder-gray-dark bg-transparent outline-none w-full text-m mb-1"
            type="text"
            placeholder="Search for Posting Blog"
            onKeyPress={(e) => {
              if (e.charCode == 13) {
                setSearch(e.target.value);
              }
            }}
          ></input>
        </div>
      </div>
      <div className="">
        <Timeline
          renderError={(_err) => (
            <ErrorForWidgets
              setSearch={setSearch}
              setSearchText={setSearchText}
            ></ErrorForWidgets>
          )}
          dataSource={{
            sourceType: "profile",
            screenName: search,
          }}
          options={{
            height: "calc(100vh - 73px)",
            theme: "dark",
          }}
        />
      </div>
    </aside>
  );
};

export default Widgets;
