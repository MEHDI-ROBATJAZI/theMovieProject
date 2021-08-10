import React,{useState} from "react";
import useMovieApi from "../../hooks/useMovieApi";
import { SwiperSlide } from "swiper/react";
import MySlider from "../Utils/mySlider";

import { Button, Space, Image, Spin } from "antd";
// import classes from "./TrendsStyle.module.scss";
import "./TrendsStyle.css";
import { Link } from "react-router-dom";

const Movies = () => {
  const [ActiveButton, setActiveButton] = useState("day");

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

  const ActiveStyle ={
    background:"rgb(91, 255, 50)",
    color:'black',
    fontWeight:"bold"
  }

  return (
    <div className="mycarousel">
      <Space style={{ padding: "10px 0" }}>
        <h1 className="trendsTitle">movie</h1>
        <Button
          shape="round"
          onClick={() => {
            setActiveButton("day");
            dayButtonClick();
          }}
          style={
            ActiveButton === "day" ? ActiveStyle :{background:"white"}
          }
        >
          day
        </Button>
        <Button
          // type="dashed"
          style={
            ActiveButton === "week" ? ActiveStyle :{background:"white"}
          }
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
                    src={`https://image.tmdb.org/t/p/w400/${m.backdrop_path}`}
                    alt={m.title}
                  />
                  <p>{m.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </MySlider>
    </div>
  );
};

export default Movies;
