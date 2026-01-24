import { use } from "react";

import trollyImage from "../../../assets/customer-top.png";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="container mx-auto p-4 my-12 sm:my-20 ">
      <div className="flex flex-col items-center">
        <img src={trollyImage} alt="Customer Top" className="mx-auto mb-8" />
        <div className="max-w-3xl text-center">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-center mb-6">
            What our customers are sayings
          </h3>
          <p className="text-gray-600 sm:text-sm text-xs">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
