import React, { useState } from "react";
import { Menu } from "antd";
import Home from "../Render/Home";
import TrendingRender from "../Render/trendsPage";
import { Layout } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import MovieDetails from "../Render/MovieDetails";

const { Header, Content, Footer } = Layout;



const Nav = () => {

  return (
    <div>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            // onSelect={({ key }) => callback(key)}
          >
            <Menu.Item ><Link to="/">home</Link></Menu.Item>
            <Menu.Item ><Link to="/trending">trending</Link></Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "0 50px" }}>
        <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/trending">
          <TrendingRender />
        </Route>
        <Route exact path="/movieDetails/:id">
          <MovieDetails />
        </Route>
      </Switch>


        </Content>
      </Layout>
    </div>
  );
};

export default Nav;
