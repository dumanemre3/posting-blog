import React, { useState } from "react";
import PostingBlogLogo from "../../images/postingblog.png";
import { Timeline } from "react-twitter-widgets";
import ErrorForWidgets from "../../components/ErrorForWidgets";

const ExploreLeft = () => {
  const [search, setSearch] = useState("turkcespor");

  return (
    <div>
      <div className="">
        <div className="text-center">
          <div className="font-bold text-white mt-5">SPORT</div>
          <div>
            <div className="mb-4 mt-4">
              <a
                onClick={() => {
                  setSearch("basketbolig");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Basketbol
              </a>
              <a
                onClick={() => {
                  setSearch("futbol");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Futbol
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("tennis");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Tennis
              </a>
              <a
                onClick={() => {
                  setSearch("voleybol");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Voleybol
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("hentbol");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Hentbol
              </a>
              <a
                onClick={() => {
                  setSearch("F1");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Formula 1
              </a>
            </div>
          </div>
          <Timeline
            renderError={(_err) => (
              <ErrorForWidgets
                setSearch={setSearch("turkcespor")}
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
      </div>
    </div>
  );
};

export default ExploreLeft;
