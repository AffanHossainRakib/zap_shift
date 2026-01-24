import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import Offer from "../Offer/Offer";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Services />
      <Brands />
      <Features />
      <Offer />
    </div>
  );
};

export default Home;
