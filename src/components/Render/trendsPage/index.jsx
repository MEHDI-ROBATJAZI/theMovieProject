import React from "react";
import "swiper/swiper-bundle.min.css";
import Celebs from "./Celebs";
import Movies from "./Movies";
import TvShows from "./TvShows";



const TrendingRender = () => {
  
  return (
    <div>

      <Movies />
      <TvShows />
      <Celebs />
    </div>
  );
};

export default TrendingRender;
