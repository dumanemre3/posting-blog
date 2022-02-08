import React from "react";
import Sidebar from "../../layout/Sidebar";

const Logout = ({ handleLogout }) => {
  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={handleLogout}
    >
      Logout123
    </button>
  );
};
export default Logout;
