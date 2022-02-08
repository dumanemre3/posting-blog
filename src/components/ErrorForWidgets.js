import React from "react";
import { Timeline } from "react-twitter-widgets";
// import { LockClosedIcon } from "@heroicons/react/solid";
import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";

function ErrorForWidgets({ setSearch, setSearchText }) {
  return (
    <div className="bg-dark-gray flex justify-content-center py-20">
      {
        <>
          <div className="min-h-full flex items-center justify-center py-20 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-20 rounded-full object-contain"
                  src={_Post_Blog_Logo}
                  alt="Workflow"
                />
                <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-300">
                  Please enter a valid address.
                </h2>
                <p className="mt-3 text-center text-sm text-gray-600">or </p>
                <p className="mt-3 text-center text-sm text-gray-600">
                  <div>
                    <a
                      onClick={() => {
                        setSearch("Medyascopetv");
                        setSearchText("Medyascopetv");
                      }}
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Go to Turkey's most up-to-date news site.
                    </a>
                  </div>
                </p>
                <p className="mt-20 text-center text-xl text-gray-600">
                  Türkiye's the best blog website.
                </p>
                <p className="mt-2 text-center text-m text-gray-600">Enjoy!</p>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default ErrorForWidgets;
