import React from "react";
import useMovieApi from "../../../hooks/useMovieApi";
import { Image, Space, Empty } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./celebrityImageSlider";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation , Autoplay } from "swiper/core";
import { Link } from "react-router-dom";

// install Swiper modules
SwiperCore.use([Pagination, Navigation , Autoplay]);

const MovieImageSlider = ({ id }) => {
  const { data, loading } = useMovieApi(`person/${id}/movie_credits`);

  return (
    <div style={{ margin: "100px 20px" }}>
      {!loading && (
        <Swiper
          className="swiper-container mySwiper"
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            "delay": 5000,
            "disableOnInteraction": false
          }} 
          breakpoints={{
            "640": {
              "slidesPerView": 2,
              "spaceBetween": 20
            },
            "768": {
              "slidesPerView": 3,
              "spaceBetween": 40
            },
            "1024": {
              "slidesPerView": 4,
              "spaceBetween": 50
            }
          }}
        >
          {data.cast.map((movie) => (
            <SwiperSlide key={movie.id} className="swiper-slide">
              {movie.poster_path ? (
                  <Link to={`/movieDetails/${movie.id}?flag=movie`}>
                <Space  size={10} direction="vertical">
                  <Image
                  style={{height:"300px"}}
                    preview={false}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p style={{ fontSize: "12px" }}>
                    {movie.title}
                  </p>
                </Space>
                  </Link>
              ) : (
                <div>
                  <Empty style={{height:"250px"}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  <p style={{ fontSize: "12px" }}>
                    {movie.title }
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieImageSlider;
