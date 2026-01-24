import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import Offer from "../Offer/Offer";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";

const reviewsPromiise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <Brands />
      <Features />
      <Offer />
      <Reviews reviewsPromise={reviewsPromiise} />
    </div>
  );
};

export default Home;
