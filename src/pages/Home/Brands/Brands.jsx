import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import amazon_vector from "../../../assets/brands/amazon_vector.png";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

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
  const logos = [...brandLogos, ...brandLogos];

  return (
    <div className="container mx-auto p-4 my-4 sm:my-12 rounded-3xl">
      <h3 className="sm:text-3xl font-extrabold text-secondary text-center mb-8">
        We've helped thousands of sales teams
      </h3>

      <div className="overflow-hidden">
        <Swiper
          slidesPerView="4"
          spaceBetween={30}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          allowTouchMove={false}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <img src={logo} alt={`Brand ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Critical: overrides Swiper's default ease timing which causes the pause effect */}
      <style>{`
        .mySwiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>  
    </div>
  );
};

export default Brands;
