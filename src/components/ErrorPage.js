import React from "react";
import { Route } from "react-router-dom";
import Content from "../layout/Content";
import Home from "./Home";

const ErrorPage = () => {
  return (
    <div class="flex items-center justify-center">
      <div class="flex flex-col items-center justify-center md:py-24 lg:py-32">
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>
        <p class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span class="text-red-500">Oops!</span> Page not found
        </p>
        <p class="mb-8 text-center text-blue-600 text-2xl">
          The page you’re looking for doesn’t exist.
        </p>
        <a
          href="./"
          class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
          onClick={() => {
            // Home page e yönlendirecek
          }}
        >
          Go To Home Page
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
