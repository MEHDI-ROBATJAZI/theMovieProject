import React from "react";
import "swiper/swiper-bundle.min.css";
import Persons from "./Persons";
import Movies from "./Movies";
import TvShows from "./TvShows";


const styleSection={
  background:"#ded6f1", 
  margin:"20px 0",
  padding:"30px"
}


const TrendingRender = () => {
  
  return (
    <div>
      <div style={styleSection}>
        <Movies />

      </div>
      <div style={styleSection}>
        <TvShows />

      </div>
      <div style={styleSection}>
        <Persons />


      </div>
    </div>
  );
};

export default TrendingRender;
