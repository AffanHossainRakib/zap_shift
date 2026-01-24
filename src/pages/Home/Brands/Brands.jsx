import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import amazon_vector from "../../../assets/brands/amazon_vector.png";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay, FreeMode } from "swiper/modules";

const brandLogos = [
  amazon_vector,
  amazon,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <div className="container mx-auto p-4 my-4 sm:my-12 rounded-3xl ">
      <h3 className="sm:text-3xl font-extrabold text-center mb-8">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        freeMode={true}
        freeModeMomentum={false}
        modules={[Autoplay, FreeMode]}
        className="mySwiper"
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img
              src={logo}
              alt={`Brand ${index + 1}`}
              className="mx-auto object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
