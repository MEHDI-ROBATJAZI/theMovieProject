import React from "react";
import useMovieApi from "../../../hooks/useMovieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Button, Space, Image } from "antd";

const Movies = () => {

  const {
    data: movies = {},
    reFetch: refetchMovies,
    loading: dayMoviesLoading,
  } = useMovieApi(`trending/movie/day`);
  
    const weekButtonClick=()=>{
      refetchMovies("https://api.themoviedb.org/3/trending/movie/week")
    }
    const dayButtonClick=()=>{
      refetchMovies("https://api.themoviedb.org/3/trending/movie/day")
      
    }
  
  return (
    <div>
      <Space style={{padding:"10px 0"}}>
        <h1>movie</h1>
        <Button type="dashed" shape="round" onClick={()=>dayButtonClick()}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={()=>weekButtonClick()}>
          week
        </Button>
      </Space>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {dayMoviesLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading</h1>
        ) : (
          movies.results.map((m) => (
            <SwiperSlide key={m.id}
              className="shadow"
            >
              <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`}
                alt={m.title}
              />
              <p style={{textAlign:"center"}}>{m.title}</p>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Movies;
