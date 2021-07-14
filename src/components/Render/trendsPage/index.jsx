import React from "react";
import "swiper/swiper-bundle.min.css";
import Persons from "./Persons";
import Movies from "./Movies";
import TvShows from "./TvShows";



const TrendingRender = () => {
  
  return (
    <div>

      <Movies />
      <TvShows />
      <Persons />
    </div>
  );
};

export default TrendingRender;
