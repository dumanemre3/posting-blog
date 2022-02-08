import React, { useState } from "react";
import Route from "../src/route/route";
import { HomeIcon, ExploreIcon } from "./icons/Icons";
import Container from "./layout/Container";
import Content from "./layout/Content";
import Main from "./layout/Main";
import Sidebar from "./layout/Sidebar";
import Widgets from "./layout/Widgets";

const App = () => {
  return (
    <Container>
      <Route></Route>
    </Container>
  );
};

export default App;
