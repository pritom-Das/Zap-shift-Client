import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bannerimage1 from "../../../assets/banner/banner1.png";
import bannerimage2 from "../../../assets/banner/banner2.png";
import bannerimage3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      interval={2000}
    >
      <div className="relative">
        <div className="flex gap-7 absolute top-5/6 left-1/6 -translate-x-1/2 -translate-y-1/2 z-10">
          <p className="bg-primary px-4 py-2 rounded-2xl">Track your parcel</p>
          <button className="btn rounded-xl">Be a rider</button>
        </div>

        <img src={bannerimage1} />
      </div>
      <div>
        <img src={bannerimage2} />
      </div>
      <div>
        <img src={bannerimage3} />
      </div>
    </Carousel>
  );
};

export default Banner;
