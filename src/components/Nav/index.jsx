import React, { useState } from "react";
import { Menu } from "antd";
import MainRender from "../Render/mainRender";
import TrendingRender from "../Render/trendsPage";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;



const Nav = () => {
  const [navState, setNavState] = useState("trending");

  return (
    <div>
      <Layout>
        <Header>
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
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <div>
            {navState === "popular" && <MainRender navState={navState} />}
            {navState === "upcoming" && <MainRender navState={navState} />}
            {navState === "trending" && <TrendingRender />}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Nav;
