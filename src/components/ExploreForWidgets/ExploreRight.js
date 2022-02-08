import React, { useState } from "react";
import PostingBlogLogo from "../../images/postingblog.png";
import { Timeline } from "react-twitter-widgets";
import ErrorForWidgets from "../../components/ErrorForWidgets";

const ExploreRight = () => {
  const [search, setSearch] = useState("CNBC");

  return (
    <div>
      <div className="">
        <div className="text-center">
          <div className="font-bold text-white mt-5">GLOBAL NEW</div>
          <div>
            <div className="mb-4 mt-4">
              <a
                onClick={() => {
                  setSearch("BBCWorld");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                BBCWorld
              </a>
              <a
                onClick={() => {
                  setSearch("TRTWorldNow");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                TRTWorld
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("AJEnglish");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                AlJazeera
              </a>
              <a
                onClick={() => {
                  setSearch("nytimes");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                NewYorkTimes
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("cnn");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                CNN
              </a>
              <a
                onClick={() => {
                  setSearch("BBCWorld");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                BBCWorld
              </a>
            </div>
          </div>
          <Timeline
            renderError={(_err) => (
              <ErrorForWidgets setSearch={setSearch("CNBC")}></ErrorForWidgets>
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
      </div>
    </div>
  );
};

export default ExploreRight;
