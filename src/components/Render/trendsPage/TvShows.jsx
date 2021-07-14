import React from "react";
import useMovieApi from "../../../hooks/useMovieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Button, Space, Image } from "antd";

const TvShows = () => {
  const {

    data: tvs = {},
    reFetch: refetchTvs,
    loading: dayTvsLoading,

  } = useMovieApi(`trending/tv/day`);

  const weekButtonClick=()=>{
    refetchTvs("https://api.themoviedb.org/3/trending/tv/week")
  }
  const dayButtonClick=()=>{
    refetchTvs("https://api.themoviedb.org/3/trending/tv/day")
    
  }

  return (
    <div style={{ height: "400px", alignSelf: "center" }}>
      <Space>
        <h1>tv</h1>
        <Button type="dashed" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {dayTvsLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading</h1>
        ) : (
          tvs.results.map((t) => (
            <SwiperSlide key={t.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${t.backdrop_path}`}
              />
              <p>{t.name}</p>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default TvShows;
