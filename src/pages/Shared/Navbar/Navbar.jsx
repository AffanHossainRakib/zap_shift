import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";
import { VscThreeBars } from "react-icons/vsc";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
    </>
  );
  return (
    <div className="sticky top-4 z-50 ">
      <div className="navbar bg-white shadow-sm rounded-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <VscThreeBars className="h-6 w-6 fill-primary-content" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-secondary-content"
            >
              {links}
            </ul>
          </div>

          <Logo className="w-full h-full object-contain" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-secondary-content">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-2">
            <SecondaryBtn to="/login" message="Sign In" />
          </div>
          <div >
            <PrimaryBtn to="/register" message="Sign Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
