import React from "react";
import { Button, Space, Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import useMovieApi from "../../../hooks/useMovieApi";

const Celebs = () => {
  const {
    data: celebs = {},
    // reFetch: refetchPersons,
    loading: PersonsLoading,
  } = useMovieApi(`trending/person/day`);
  console.log(celebs);

  return (
    <div style={{ height: "400px", alignSelf: "center" }}>
      <Space>
        <h1>celebrities</h1>
        <Button type="primary" shape="round">
          day
        </Button>
        <Button type="dashed" danger shape="round">
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
          celebs.results.map((c) => {
            {
              c.profile_path === null ? (
                <span>{c.name}</span>
              ) : (
                <SwiperSlide key={c.id}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                  />
                  <p>{c.name}</p>
                </SwiperSlide>
              );
            }
          })
        )}
      </Swiper>
    </div>
  );
};

export default Celebs;
