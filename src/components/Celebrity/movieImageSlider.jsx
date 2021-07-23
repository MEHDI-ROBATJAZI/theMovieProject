import React from "react";
import useMovieApi from "../../hooks/useMovieApi";
import { Image, Space, Empty } from "antd";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./celebrityImageSlider";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import { Link } from "react-router-dom";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const MovieImageSlider = ({ id }) => {
  const { data, loading } = useMovieApi(`person/${id}/movie_credits`);
  console.log(data);
  console.log(loading);

  return (
    <div style={{ margin: "100px 20px" }}>
      {!loading && (
        <Swiper
          className="swiper-container mySwiper"
          slidesPerView={6}
          spaceBetween={30}
          slidesPerGroup={4}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
        >
          {data.cast.map((movie) => (
            <SwiperSlide className="swiper-slide">
              {movie.poster_path ? (
                  <Link to={`/movieDetails/${movie.id}`}>
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
