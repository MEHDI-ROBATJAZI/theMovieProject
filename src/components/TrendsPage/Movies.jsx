import React from "react";
import useMovieApi from "../../hooks/useMovieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css"
import { Button, Space, Image, Spin } from "antd";
// import classes from "./TrendsStyle.module.scss";
import "./TrendsStyle.css"
import { Link } from "react-router-dom";
import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay
} from 'swiper/core';

const Movies = () => {
  const {
    data: movies = {},
    reFetch: refetchMovies,
    loading: dayMoviesLoading,
  } = useMovieApi(`trending/movie/day`);

  const weekButtonClick = () => {
    refetchMovies("https://api.themoviedb.org/3/trending/movie/week");
  };
  const dayButtonClick = () => {
    refetchMovies("https://api.themoviedb.org/3/trending/movie/day");
  };

  
  SwiperCore.use([Autoplay,Pagination,Navigation]);

  return (
    <div className="mycarousel">
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">movie</h1>
        <Button type="dashed" shape="round" onClick={() => dayButtonClick()}>
          day
        </Button>
        <Button
          type="dashed"
          danger
          shape="round"
          onClick={() => weekButtonClick()}
        >
          week
        </Button>
      </Space>
      <Swiper
        pagination={{clickable:true}}
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": false
        }} 
        breakpoints={{
          "640": {
            "slidesPerView": 1,
            "spaceBetween": 20
          },
          "768": {
            "slidesPerView": 2,
            "spaceBetween": 40
          },
          "1024": {
            "slidesPerView": 3,
            "spaceBetween": 50
          }
        }}
      >
        {dayMoviesLoading ? (
          <div className="spinContainer">
            <Spin />
          </div>
        ) : (
          movies.results.map((m) => (
            <SwiperSlide key={m.id}>
              <Link to={`/movieDetails/${m.id}?flag=movie`}>
                <div className="swiper-card-flex">
                  <Image
                    preview={false}
                    src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`}
                    alt={m.title}
                  />
                  <p>{m.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Movies;
