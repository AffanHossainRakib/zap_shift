import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import PrimaryBtn from "../../../components/PrimaryBtn/PrimaryBtn";
import SecondaryBtn from "../../../components/SecondaryBtn/SecondaryBtn";
import { VscThreeBars } from "react-icons/vsc";
import useAuth from "../../../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then()
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navLinks = [
    { to: "/services", label: "Services" },
    { to: "/coverage", label: "Coverage" },
    { to: "/about", label: "About Us" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Blog" },
    { to: "/rider", label: "Be a Rider" },
  ];

  const links = (
    <>
      {navLinks.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive
                ? "bg-primary text-primary-content rounded-3xl px-4 py-2"
                : ""
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );
  return (
    <div className="sticky top-4 z-500 container mx-auto px-4">
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
          <div className="flex gap-2">
            {user ? (
              <button onClick={handleLogout} className="btn btn-primary">
                <IoLogOutOutline />
                Logout
              </button>
            ) : (
              <>
                <SecondaryBtn to="/login" message="Sign In" />
                <PrimaryBtn to="/register" message="Sign Up" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
