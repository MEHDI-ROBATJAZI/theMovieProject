import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import useMovieApi from "../../../hooks/useMovieApi";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";

import "./celebrity.scss";

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

const CelebrityImageSlider = ({ id }) => {
  const { data: images = {}, loading: imagesLoading = true } = useMovieApi(
    `person/${id}/images`
  );

  return (
    <div className={"CelebrityImagesSlider"}>
      {!imagesLoading && (
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={
            {
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }
          }
          pagination={true}
          className="swiper-container"
        >
          {images.profiles.map((pic) => (
            <SwiperSlide key={pic.file_path} className="swiper-slide">
              
              <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/w500${pic.file_path}`}
                width="400px"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CelebrityImageSlider;
