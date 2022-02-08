import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "../components/Explore";
import Donate from "../components/Donate";
import ToDoComponent from "../components/ToDoComponent";
import Saves from "../components/Saves";
import Weather from "../components/Weather";
import Profile from "../components/Profile";
import ErrorPage from "../components/ErrorPage";
import Content from "../layout/Content";
import Welcome from "../components/login/welcome";
import Login from "../components/login/login";
import Register from "../components/login/register";
import ProtectedRoute from "./protectedRoute";
import Sidebar from "../layout/Sidebar";
import Widgets from "../layout/Widgets";
import Settings from "../components/Settings";

const route = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/welcome" element={<Welcome></Welcome>}></Route> */}
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Content></Content>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Content></Content>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore></Explore>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate></Donate>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/todocomponent"
          element={
            <ProtectedRoute>
              <ToDoComponent></ToDoComponent>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/saves"
          element={
            <ProtectedRoute>
              <Saves></Saves>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather></Weather>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ErrorPage></ErrorPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/widgets"
          element={
            <ProtectedRoute>
              <Widgets></Widgets>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings></Settings>
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="/home" element={<Content></Content>}></Route>
        <Route path="/explore" element={<Explore></Explore>}></Route>
        <Route path="/donate" element={<Donate></Donate>}></Route>
        <Route
          path="/todocomponent"
          element={<ToDoComponent></ToDoComponent>}
        ></Route>
        <Route path="/saves" element={<Saves></Saves>}></Route>
        <Route path="/weather" element={<Weather></Weather>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route> */}
      </Routes>
    </Router>
  );
};

export default route;
