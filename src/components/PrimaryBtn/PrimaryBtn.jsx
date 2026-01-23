import { Link } from "react-router";

const PrimaryBtn = ({ to, message }) => {
  return (
    <>
      <button className="btn btn-primary text-primary-content font-bold">
        <Link to={to}>{message}</Link>
      </button>
    </>
  );
};

export default PrimaryBtn;
