import React from "react";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";

import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/core";

const MySlider = (props) => {
  const { slidesPerView, children } = props;

  SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

  return (
    <Swiper
      effect={props.effect}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      className="mySwiper"
      breakpoints={{
        640: {
          slidesPerView: slidesPerView > 4 ? 2 : 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: slidesPerView > 4 ? 3 : 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: slidesPerView || 4,
          spaceBetween: slidesPerView > 4 ? 25 : 50,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default MySlider;
