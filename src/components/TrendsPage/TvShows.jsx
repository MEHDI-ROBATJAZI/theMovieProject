import React, { useState } from "react";
import useMovieApi from "../../hooks/useMovieApi";
import { SwiperSlide } from "swiper/react";
import MySlider from "../Utils/mySlider";

import { Button, Space, Image, Spin } from "antd";
import { Link } from "react-router-dom";
const TvShows = () => {
  const [ActiveButton, setActiveButton] = useState("day");

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

  const ActiveStyle = {
    background: "rgb(91, 255, 50)",
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div>
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">tv shows</h1>
        <Button
          style={ActiveButton === "day" ? ActiveStyle : { background: "white" }}
          type="dashed"
          shape="round"
          onClick={() => {
            setActiveButton("day");
            dayButtonClick();
          }}
        >
          day
        </Button>
        <Button
          style={
            ActiveButton === "week" ? ActiveStyle : { background: "white" }
          }
          type="dashed"
          danger
          shape="round"
          onClick={() => {
            setActiveButton("week");
            weekButtonClick();
          }}
        >
          week
        </Button>
      </Space>
      <MySlider slidesPerView={3}>
        {dayTvsLoading ? (
          <div className="spinContainer">
            <Spin />
          </div>
        ) : (
          tvs?.results?.map((t) => (
            <SwiperSlide key={t.id}>
              <Link to={`movieDetails/${t.id}?flag=tv`}>
                <div className="swiper-card-flex">
                  <Image
                    preview={false}
                    src={`https://image.tmdb.org/t/p/w400/${t.backdrop_path}`}
                    alt={t.name}
                  />
                  <p>{t.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </MySlider>
    </div>
  );
};

export default TvShows;
