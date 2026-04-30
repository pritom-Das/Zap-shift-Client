import React from "react";
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/amazon_vector.png";
import brand3 from "../../../assets/brands/casio.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/star.png";

// import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Brand = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <img src={brand1} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={brand2} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={brand3} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={brand4} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={brand5} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={brand6} alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Brand;
