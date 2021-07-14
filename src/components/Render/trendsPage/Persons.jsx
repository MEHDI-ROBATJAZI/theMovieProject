import React from "react";
import { Button, Space, Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import useMovieApi from "../../../hooks/useMovieApi";

import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";

import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

const Persons = () => {
  const {
    data: persons = {},
    reFetch: refetchPersons,
    loading: PersonsLoading,
  } = useMovieApi(`trending/person/day`);
  console.log(persons);

  const dayButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/day`);
  };

  const weekButtonClick = () => {
    refetchPersons(`https://api.themoviedb.org/3/trending//person/week`);
  };

  return (
    <div style={{ height: "400px", alignSelf: "center" }}>
      <Space>
        <h1>persons</h1>
        <Button type="primary" shape="round" onClick={dayButtonClick}>
          day
        </Button>
        <Button type="dashed" danger shape="round" onClick={weekButtonClick}>
          week
        </Button>
      </Space>
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {PersonsLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading</h1>
        ) : (
          persons.results.map((p) => (
            <SwiperSlide key={p.id}>
              <Image
                height="250px"
                src={
                  p.profile_path === null
                    ? "/userIcon.png"
                    : `https://image.tmdb.org/t/p/w500${p.profile_path}`
                }
                alt={p.original_title}
              />
              <Space>
                <p>{p.name} ------</p>
                <p>{p.known_for_department}</p>
              </Space>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div style={{ minHeight: "500px" , margin:"100px"}}>
        <Swiper navigation={true} className="mySwiper">
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 1</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 2</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 3</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 4</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 5</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 6</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 7</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 8</SwiperSlide>
          <SwiperSlide style={{background:"blue" , height:"400px"}}>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Persons;
