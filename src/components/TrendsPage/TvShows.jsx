import React from "react";
import useMovieApi from "../../hooks/useMovieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";

import { Button, Space, Image, Spin } from "antd";
import { Link } from "react-router-dom";
import SwiperCore, { Pagination, Navigation,Autoplay } from "swiper/core";
const TvShows = () => {
  const {
    data: tvs = {},
    reFetch: refetchTvs,
    loading: dayTvsLoading,
  } = useMovieApi(`trending/tv/day`);

  const weekButtonClick = () => {
    refetchTvs("https://api.themoviedb.org/3/trending/tv/week");
  };
  const dayButtonClick = () => {
    refetchTvs("https://api.themoviedb.org/3/trending/tv/day");
  };
  SwiperCore.use([Pagination, Navigation , Autoplay]);
  return (
    <div>
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">tv shows</h1>
        <Button type="dashed" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <Swiper
        pagination={{ clickable: true }}
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
        {dayTvsLoading ? (
          <div className="spinContainer">
            <Spin />
          </div>
        ) : (
          tvs.results.map((t) => (
            <SwiperSlide key={t.id}>
              <Link to={`movieDetails/${t.id}?flag=tv`}>
                <div className="swiper-card-flex">
                  <Image
                    preview={false}
                    src={`https://image.tmdb.org/t/p/w500/${t.backdrop_path}`}
                    alt={t.name}
                  />
                  <p>{t.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default TvShows;
