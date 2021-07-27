import React from "react";
import "swiper/swiper-bundle.min.css";
import Persons from "./Persons";
import Movies from "./Movies";
import TvShows from "./TvShows";
// import classes from './TrendsStyle.module.scss'
import "./TrendsStyle.css"
import Title from "../../Seo/Title"


const TrendingRender = () => {
  
  return (
    <div>
      <Title title="trends page" description="popular trending page" />

      <div className="GlassMorphism">
        <Movies />

      </div>
      <div className="GlassMorphism">
        <TvShows />

      </div>
      <div className="GlassMorphism">
        <Persons />
      </div>


    </div>
  );
};

export default TrendingRender;
