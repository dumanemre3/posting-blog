import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Main from "../layout/Main";
import Widgets from "../layout/Widgets";
import Spinner from "../images/Spinner-1s-200px (1).svg";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  return loading ? (
    <div
      className="h-screen w-full flex items-center justify-center "
      style={{ background: "#00071c" }}
    >
      <img src={Spinner} alt="" />
    </div>
  ) : user ? (
    <>
      <Sidebar></Sidebar>
      <Main>{children}</Main>
      <Widgets></Widgets>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
