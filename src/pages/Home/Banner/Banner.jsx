import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";

const banners = [banner1, banner2, banner3];

const Banner = () => {
  return (
    <div className="relative my-4 sm:my-9">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={600}
      >
        {banners.map((banner, index) => (
          <div key={index} className="h-[60vh] sm:h-auto overflow-hidden">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover sm:object-contain sm:h-auto"
            />
          </div>
        ))}
      </Carousel>

      {/* Buttons overlay */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 z-10 flex flex-col sm:flex-row gap-2 sm:gap-4 w-[calc(100%-2rem)] sm:w-auto">
        <PrimaryBtn to="" message="Track your parcel" />
        <SecondaryBtn to="" message="Be a Rider" />
      </div>
    </div>
  );
};

export default Banner;
