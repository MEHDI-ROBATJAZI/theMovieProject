import React, { useState,useEffect } from "react";
import classes from "./App.module.scss";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingRender from "./components/TrendsPage";
import Celebrity from "./components/Celebrity/getDetail";
import CelebrityPopularPage from "./components/Celebrity/celebrityPopularPage";
import { Layout, Space } from "antd";
import { Link, Route, Switch ,useLocation } from "react-router-dom";
import SearchComponent from "./components/Search/serchComponent";
import SearchPage from "./components/Search/searchPage";
import Page404 from "./components/Page404";
import About from "./components/About"
import Footer from "./components/Footer";
import Dropdown from "./components/ProfileBar/Dropdown";
import Auth from "./components/ProfileBar/Auth";
import MyMovieIcon from "./Icon";
import Profile from "./components/ProfileBar/profile";
import useWindowSize from "./hooks/useWindowSize";

const { Content } = Layout;

const App = () => {
  const [Responsive, setResponsive] = useState(false);
  const [IconProfileResponsive, setIconProfileResponsive] = useState(false);
  const [BurgerClick, setBurgerClick] = useState(false);
  const width = useWindowSize();


  
  // when route is change , window scroll go top
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo({top:0 , behavior:"smooth"})
  },[pathname])


  useEffect(() => {
    width > 767 ? setResponsive(false) : setResponsive(true);
    if (width < 768 || width > 1200) {
      setBurgerClick(false);
    }
  }, [width]);

  const handleNavLinksChange = () => {
    let navLinks = document.querySelectorAll("#_NavLinks_1fqut_1 span a");
    if (navLinks[0] == undefined)
      navLinks = document.querySelectorAll(
        "#_NavLinksResponsive_1fqut_1 span a"
      );

    navLinks.forEach((n) => {
      if (window.location.href === n.href) {
        n.classList.add("navActiveLinks");
      } else {
        n.classList.remove("navActiveLinks");
      }
    });
  };


  return (
    <div id={classes.Container}>
      <Layout style={{ background: "#d1d0e5" }}>
        <header
          id={Responsive ? classes.HeaderResponsive : classes.HeaderStyles}
        >
          <nav
            id={Responsive ? classes.NavStylesResponsive : classes.NavStyles}
          >
            <div
              id={classes.MovieIcon}
              style={
                BurgerClick
                  ? {
                      position: "absolute",
                      top: "0",
                      left: "120px",
                    }
                  : {}
              }
            >
              <MyMovieIcon />
            </div>
            <div
              id={classes.Burger}
              onClick={() => {
                setResponsive(!Responsive);
                setIconProfileResponsive(!IconProfileResponsive);
                setBurgerClick(true);
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id={classes.Spacing}></div>
            <div
              id={Responsive ? classes.NavLinksResponsive : classes.NavLinks}
              style={BurgerClick ? {paddingTop:"60px"} : {}}
            >
              <span onClick={handleNavLinksChange}>
                <Link to="/">Home</Link>
              </span>
              <span onClick={handleNavLinksChange}>
                <Link to="/trending">Trending</Link>
              </span>
              <span onClick={handleNavLinksChange}>
                <Link to="/celebrity">Celebrity</Link>
              </span>
              <span onClick={handleNavLinksChange}>
                <Link to="/about">About</Link>
              </span>
            </div>
            <div
              id={
                Responsive
                  ? classes.serachComponentResponsive
                  : classes.SearchComponent
              }
            >
              <SearchComponent />
            </div>
            <Space
              id={classes.ProfileBar}
              style={
                BurgerClick
                  ? {
                      position: "absolute",
                      top: "0",
                      right: "120px",
                    }
                  : {}
              }
            >
              <Dropdown />
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
            <Route path="/Auth">
              <Auth />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route exact path="/search">
              <SearchPage />
            </Route>
            <Route path="/search/:text">
              <SearchPage />
            </Route>
            <Route exact path="/celebrity">
              <CelebrityPopularPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
