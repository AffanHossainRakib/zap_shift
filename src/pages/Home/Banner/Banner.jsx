import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";

const Banner = () => {
  return (
    <div className="relative my-9">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={banner1} alt="Banner 1" />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" />
        </div>
        <div>
          <img src={banner3} alt="Banner 3" />
        </div>
      </Carousel>

      {/* Buttons overlay */}
      <div className="absolute hidden sm:flex md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 z-10 sm:flex-row gap-2 sm:gap-4">
        <PrimaryBtn to="" message="Track your parcel" />
        <SecondaryBtn to="" message="Be a Rider" />
      </div>
    </div>
  );
};

export default Banner;
