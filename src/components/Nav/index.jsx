import React, { useState } from "react";
import { Menu } from "antd";
import MainRender from "../Render/mainRender";
import TrendingRender from "../Render/trendsPage";

const Nav = () => {
  const [navState, setNavState] = useState("trending");

  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["trending"]}
        onSelect={({ key }) => setNavState(key)}
      >
        <Menu.Item key="popular">popular</Menu.Item>
        <Menu.Item key="upcoming">upcoming</Menu.Item>
        <Menu.Item key="trending">trending</Menu.Item>
      </Menu>

      {navState === "popular" && <MainRender navState={navState} />}
      {navState === "upcoming" && <MainRender navState={navState} />}
      {navState === "trending" && <TrendingRender />}

    </div>
  );
};

export default Nav;
