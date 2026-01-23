import { Link } from "react-router";

const SecondaryBtn = ({ to, message }) => {
  return (
    <>
      <button className="btn text-secondary-content font-bold">
        <Link to={to}>{message}</Link>
      </button>
    </>
  );
};

export default SecondaryBtn;
