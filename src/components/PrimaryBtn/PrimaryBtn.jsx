import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router";

const PrimaryBtn = ({ to, message }) => {
  return (
    <>
      <Link to={to} className="flex items-center">
        <button className="btn btn-primary text-primary-content font-bold">
          {message}
        </button>
        <BsArrowUpRightCircleFill className="sm:h-10 sm:w-10 h-4 w-4 bg-primary rounded-full" />
      </Link>
    </>
  );
};

export default PrimaryBtn;
