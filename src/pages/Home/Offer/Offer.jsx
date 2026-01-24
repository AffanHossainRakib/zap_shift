import { Link } from "react-router";
import beAMerchangeantImage from "../../../assets/be-a-merchant-bg.png";
import locationMerchantImage from "../../../assets/location-merchant.png";

const Offer = () => {
  return (
    <section className="relative bg-secondary text-white rounded-3xl mt-10 overflow-hidden">
      {/* Background Wave Pattern */}
      <div className="absolute top-0 left-0 w-full h-48 opacity-30">
        <img
          src={beAMerchangeantImage}
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 px-8 md:px-12 lg:px-16 py-12 lg:py-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Merchant and Customer Satisfaction
            <br />
            is Our First Priority
          </h2>

          <p className="text-white/80 text-sm md:text-base max-w-lg">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link>
              <button className="btn btn-primary text-primary-content font-bold rounded-full btn-sm w-full sm:btn-lg  sm:w-auto">
                Become a Merchant
              </button>
            </Link>

            <Link>
              <button className="btn btn-outline text-primary font-bold rounded-full btn-sm sm:btn-lg w-full sm:w-auto hover:bg-primary/10">
                Earn with ZapShift Courier
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
          <img
            src={locationMerchantImage}
            alt="Delivery Location Illustration"
            className="w-full max-w-md lg:max-w-lg h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Offer;
