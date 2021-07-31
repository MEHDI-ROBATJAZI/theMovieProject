import React ,{useState,useEffect} from "react";
import classes from "./App.module.scss";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingRender from "./components/TrendsPage";
import Celebrity from "./components/Celebrity/getDetail";
import CelebrityPopularPage from "./components/Celebrity/celebrityPopularPage";
import { Layout,Space } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import SearchComponent from "./components/Search/serchComponent";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";
import useResponsive from "./hooks/useResponsive";
import ProfileBar from "./components/ProfileBar";
import Auth from "./components/ProfileBar/Auth";
import MyMovieIcon from "./Icon";

const { Content } = Layout;

const App = () => {
  const [Responsive , setResponsive] = useState(false)
  const width = useResponsive()

  useEffect(() => {
    width > 767 ? setResponsive(false) : setResponsive(true)
  }, [width])

  const handleNavLinksChange=() => {
    let navLinks = document.querySelectorAll('#_NavLinks_1fqut_1 span a') 
    if(navLinks[0] == undefined) navLinks = document.querySelectorAll('#_NavLinksResponsive_1fqut_1 span a');

    navLinks.forEach(n=>{   
      if(window.location.href === n.href){
        n.classList.add("navActiveLinks")
      }else{
        n.classList.remove("navActiveLinks")
      }
    })
  }


  return (
    <div id={classes.Container}>                                                          
      <Layout style={{ background: "#d1d0e5" }}>
        <header id={Responsive ? classes.HeaderResponsive : classes.HeaderStyles}>
          <nav id={Responsive ? classes.NavStylesResponsive : classes.NavStyles}>
              <MyMovieIcon />
            <div id={classes.Burger} onClick={()=>setResponsive(!Responsive)}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div id={Responsive ? classes.NavLinksResponsive : classes.NavLinks}>
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
                <Link to="/aboutme">About-Me</Link>
              </span>
            </div>
            <div id={Responsive ? classes.serachComponentResponsive : classes.SearchComponent }>
              <SearchComponent />
            </div>
            <Space id={classes.ProfileBar}>
              <ProfileBar />
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
