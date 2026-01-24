import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router";

const PrimaryBtn = ({ to, message }) => {
  return (
    <>
      <Link to={to} className="flex items-center">
        <button className="btn btn-primary text-primary-content font-bold">
          {message}
        </button>
        <BsArrowUpRightCircleFill className="h-10 w-10 bg-primary rounded-full" />
      </Link>
    </>
  );
};

export default PrimaryBtn;
