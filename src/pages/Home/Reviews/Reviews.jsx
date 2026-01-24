import { use } from "react";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return <div>Reviews</div>;
};

export default Reviews;
