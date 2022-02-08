import React, { useState } from "react";
import PostingBlogLogo from "../../images/postingblog.png";
import { Timeline } from "react-twitter-widgets";
import ErrorForWidgets from "../../components/ErrorForWidgets";

const ExploreMiddle = () => {
  const [search, setSearch] = useState("finansgundemcom");

  return (
    <div>
      <div className="">
        <div className="text-center">
          <div className="font-bold text-white mt-5">FINANCE / ECONOMY</div>
          <div>
            <div className="mb-4 mt-4">
              <a
                onClick={() => {
                  setSearch("turkceekonomi");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Ekonomi
              </a>
              <a
                onClick={() => {
                  setSearch("FinansMynet");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                FinansMynet
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("NTVPara");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                NTV
              </a>
              <a
                onClick={() => {
                  setSearch("BloombergHT");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Bloomberg
              </a>
            </div>
            <div className="mb-4">
              <a
                onClick={() => {
                  setSearch("MatriksHaber");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                MatriksNews
              </a>
              <a
                onClick={() => {
                  setSearch("borsagundem");
                }}
                href="#"
                className="rounded-3xl px-3 py-2 mr-1 mb-2 font-medium bg-gray-300 text-sm text-gray-600 hover:text-gray-900"
              >
                Borsa
              </a>
            </div>
          </div>
          <Timeline
            renderError={(_err) => (
              <ErrorForWidgets
                setSearch={setSearch("finansgundemcom")}
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

export default ExploreMiddle;
