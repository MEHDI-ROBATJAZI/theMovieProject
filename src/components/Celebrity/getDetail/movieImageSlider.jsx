import React from "react";
import useMovieApi from "../../../hooks/useMovieApi";
import { Image, Space, Empty } from "antd";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
import MySlider from "../../Utils/mySlider";

import { Link } from "react-router-dom";


const MovieImageSlider = ({ id }) => {
  const { data, loading } = useMovieApi(`person/${id}/movie_credits`);
  console.log(data);
  return (
    <div style={{ margin: "100px 20px" }}>
      {!loading && (
        <MySlider slidesPerView={6}>
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
                    {
                      movie.release_date && (
                        <small
                          style={{color:"black"}}
                        >___{movie.release_date.slice(0,4)}</small>
                      )
                    }
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
        </MySlider>
      )}
    </div>
  );
};

export default MovieImageSlider;
