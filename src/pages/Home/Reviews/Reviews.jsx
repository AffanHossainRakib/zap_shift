import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";
import trollyImage from "../../../assets/customer-top.png";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="container mx-auto p-4 my-12 sm:my-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center mb-24 ">
        <img src={trollyImage} alt="Customer Top" className="mb-8" />
        <div className="max-w-3xl text-center">
          <h3 className="text-2xl sm:text-4xl font-extrabold mb-6">
            What our customers are saying
          </h3>
          <p className="text-gray-600 sm:text-sm text-xs">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="relative max-w-6xl mx-auto overflow-visible">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={35}
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 3 },
          }}
          className="reviews-swiper pb-20"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="overflow-visible">
              <div className="review-card bg-white rounded-xl p-8 h-full transition-all duration-500">
                <FaQuoteLeft className="text-primary/80 text-xl" />

                <p className="text-primary-content text-sm leading-relaxed mb-6">
                  {review.review}
                </p>

                <div className="border-t border-dashed pt-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center overflow-hidden">
                    {review.user_photoURL ? (
                      <img
                        src={review.user_photoURL}
                        alt={review.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      review.userName.charAt(0)
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold">{review.userName}</h4>
                    <p className="text-sm text-gray-500">{review.user_email}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <IoChevronBack />
        </button>

        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center">
          <IoChevronForward />
        </button>
      </div>

      {/* Styles */}
      <style>{`
        /* CRITICAL: prevent clipping */
        .reviews-swiper,
        .reviews-swiper .swiper-wrapper {
          overflow: visible !important;
        }

        /* Default cards (far back) */
        .reviews-swiper .swiper-slide {
          transform: scale(0.82) translateY(35px);
          opacity: 0.3;
          transition: all 0.5s ease;
          z-index: 1;
        }

        /* Side cards */
        .reviews-swiper .swiper-slide-prev,
        .reviews-swiper .swiper-slide-next {
          transform: scale(0.92) translateY(18px);
          opacity: 0.6;
          z-index: 5;
        }

        /* CENTER CARD (highlighted) */
        .reviews-swiper .swiper-slide-active {
          transform: scale(1.1) translateY(-30px);
          opacity: 1;
          z-index: 20;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
