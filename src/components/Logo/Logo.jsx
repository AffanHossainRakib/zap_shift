import { Link } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img src={logo} alt="Zap Shift Logo" />
      <h3 className="text-3xl font-bold -ms-2.5">ZapShift</h3>
    </Link>
  );
};

export default Logo;
