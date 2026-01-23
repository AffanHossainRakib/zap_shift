import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img
        src={logo}
        alt="Zap Shift Logo"
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
      />
      <h3 className="text-xl sm:text-3xl font-bold -ms-2.5 whitespace-nowrap">
        ZapShift
      </h3>
    </Link>
  );
};

export default Logo;
