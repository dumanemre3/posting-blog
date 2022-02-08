import React from "react";

function Main({ children }) {
  return (
    <main
      className="flex-1 flex-col "
      style={{ height: "100vh", overflow: "auto", background: "#00071c" }}
    >
      {children}
    </main>
  );
}

export default Main;
