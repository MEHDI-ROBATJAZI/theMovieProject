import React ,{useState,useEffect} from "react";
import classes from "./App.module.scss";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingRender from "./components/TrendsPage";
import Celebrity from "./components/Celebrity/getDetail";
import CelebrityPopularPage from "./components/Celebrity/celebrityPopularPage";
import { Col, Layout, Menu, Row, Space } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import SearchComponent from "./components/Search/serchComponent";
import { LoginOutlined } from "@ant-design/icons";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";
import useResponsive from "./hooks/useResponsive";
const { Content } = Layout;

const App = () => {
  const [Responsive , setResponsive] = useState(false)
  const width = useResponsive()

  useEffect(() => {
    width > 767 ? setResponsive(false) : setResponsive(true)
  }, [width])


  return (
    <div id={classes.Container}>
      <Layout style={{ background: "#d1d0e5" }}>
        <header id={Responsive ? classes.HeaderResponsive : classes.HeaderStyles}>
          <nav id={Responsive ? classes.NavStylesResponsive : classes.NavStyles}>
            <div id={classes.Burger} onClick={()=>setResponsive(!Responsive)}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id={Responsive ? classes.NavLinksResponsive : classes.NavLinks}>
              <span>
                <Link to="/">Home</Link>
              </span>
              <span>
                <Link to="/trending">Trending</Link>
              </span>
              <span>
                <Link to="/celebrity">Celebrity</Link>
              </span>
              <span>
                <Link to="/aboutme">About-Me</Link>
              </span>
            </div>
            <div id={Responsive ? classes.serachComponentResponsive : classes.SearchComponent }>
              <SearchComponent />
            </div>
            <Space id={classes.ProfileBar}>
              <div>
                <LoginOutlined rotate={123} style={{ fontSize: "2rem" }} />
              </div>
            </Space>
          </nav>
        </header>

        <Content>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/trending">
              <TrendingRender />
            </Route>
            <Route exact path="/celebrity">
              <CelebrityPopularPage />
            </Route>
            <Route path="/movieDetails/:id">
              <MovieDetails />
            </Route>
            <Route path="/celebrity/:id">
              <Celebrity />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </Content>
      </Layout>

    <Footer />

    </div>
  );
};

export default App;
