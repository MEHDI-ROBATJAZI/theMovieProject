import React from "react";
import classes from "./App.module.scss";
import Home from "./components/Render/Home";
import MovieDetails from "./components/Render/MovieDetails";
import TrendingRender from "./components/Render/trendsPage";
import { Col, Layout, Menu, Row } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import SearchComponent from "./components/Render/Search/serchComponent";
const { Content } = Layout;

const App = () => {
  return (
    <div id={classes.Container}>
      <Layout style={{ background: "#d1d0e5" }}>
        
          <header id={classes.HeaderStyles}>
            <nav id={classes.NavStyles}>
              <div id={classes.NavLinks}>
              <span>
                  <Link to="/">home</Link>
                </span>
                <span>
                  <Link to="/trending">trending</Link>
                </span>
                </div>
                <div id={classes.serachComponentParent}>
                <SearchComponent />
                </div>
                </nav>
          </header>
        

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

export default App;
