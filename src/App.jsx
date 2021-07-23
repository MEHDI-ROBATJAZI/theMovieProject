import React from "react";
import classes from "./App.module.scss";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingRender from "./components/trendsPage";
import { Col, Layout, Menu, Row, Space } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import SearchComponent from "./components/Search/serchComponent";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import Celebrity from "./components/Celebrity";
const { Content } = Layout;

const App = () => {
  return (
    <div id={classes.Container}>
      <Layout style={{ background: "#d1d0e5" }}>
        
          <header id={classes.HeaderStyles}>
            <nav id={classes.NavStyles}>
              <div id={classes.NavLinks}>
              <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <Link to="/trending">Trending</Link>
                </span>
                </div>
                <div id={classes.serachComponentParent}>
                <SearchComponent />
                </div>
                <Space id={classes.ProfileBar}>
                  <div>
                  <UserAddOutlined style={{fontSize:"2rem"}} />
                  </div>
                  <div>
                  <LoginOutlined rotate={123} style={{fontSize:"2rem"}} /> 
                  </div>
                </Space>
                </nav>
          </header>
        

        <Content style={{ padding: "0 50px" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/trending">
              <TrendingRender />
            </Route>
            <Route path="/movieDetails/:id">
              <MovieDetails />
            </Route>
            <Route path="/celebrity/:id">
              <Celebrity />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
