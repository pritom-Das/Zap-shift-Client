import React from "react";
import { use } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  //   console.log(reviews);

  return (
    <div className="py-10 bg-base-200">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold">What Our Users Say</h3>
        <p className="text-gray-500 mt-2">
          Real feedback from our delivery community
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30, // Slightly reduced for better readability
          stretch: 50,
          depth: 200,
          scale: 0.85,
          modifier: 1,
          slideShadows: false, // Turned off shadows for a cleaner modern look
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper !pb-12" // Added padding for pagination dots
      >
        {reviews.map((rev) => (
          <SwiperSlide key={rev.id} className="max-w-[450px]">
            <div className="card bg-white rounded-[32px] shadow-sm p-10 h-full border border-gray-50">
              <div className="flex flex-col h-full">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg
                    width="45"
                    height="35"
                    viewBox="0 0 45 35"
                    fill="none"
                    className="text-primary opacity-40" // Uses your custom #CAEB66
                  >
                    <path
                      d="M13.5 0C6.045 0 0 6.045 0 13.5C0 19.125 3.375 23.94 8.235 25.875C6.75 30.015 3.375 32.85 0 33.75V35C7.875 33.75 14.625 27.81 14.625 18V0H13.5ZM43.875 0C36.42 0 30.375 6.045 30.375 13.5C30.375 19.125 33.75 23.94 38.61 25.875C37.125 30.015 33.75 32.85 30.375 33.75V35C38.25 33.75 45 27.81 45 18V0H43.875Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                  {rev.review}
                </p>

                {/* Dashed Separator */}
                <div className="border-t border-dashed border-gray-300 w-full mb-8"></div>

                {/* User Info Section */}
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full bg-slate-800">
                      <img src={rev.user_photoURL} alt={rev.userName} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-slate-900 text-xl">
                      {rev.userName}
                    </h4>
                    <p className="text-gray-500 text-sm">Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
