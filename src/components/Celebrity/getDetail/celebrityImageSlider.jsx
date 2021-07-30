import React from "react";
import { SwiperSlide } from "swiper/react";
import MySlider from '../../Utils/mySlider'
import { Image } from "antd";
import useMovieApi from "../../../hooks/useMovieApi";
import "./celebrity.scss";



const CelebrityImageSlider = ({ id }) => {
  const { data: images = {}, loading: imagesLoading = true } = useMovieApi(
    `person/${id}/images`
  );

  return (
    <div className={"CelebrityImagesSlider"}>
      {!imagesLoading && (
        <MySlider slidesPerView={1} effect="fade" className="swiper-container">
          {images.profiles.map((pic) => (
            <SwiperSlide key={pic.file_path} className="swiper-slide">
              
              <Image
                preview={false}
                src={`https://image.tmdb.org/t/p/w500${pic.file_path}`}
                width="400px"
              />
            </SwiperSlide>
          ))}
        </MySlider>
      )}
    </div>
  );
};

export default CelebrityImageSlider;
