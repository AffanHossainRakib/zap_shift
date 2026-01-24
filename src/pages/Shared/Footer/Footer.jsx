import Logo from "../../../components/Logo/Logo";
import { FaFacebook, FaX, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router";

const Footer = () => {
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
    <div className="container mx-auto p-4">
      <footer className="footer footer-horizontal bg-[#0B0B0B] text-[#DADADA] footer-center p-10 rounded-3xl">
        <aside className="max-w-3xl mx-auto">
          <Logo />

          <p className="text-xs md:text-sm">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </aside>

        <div>
          <ul className="flex flex-row gap-9 justify-center items-center flex-wrap ">
            {links}
          </ul>
        </div>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <FaFacebook className="w-6 h-6" />
            <FaYoutube className="w-6 h-6" />
            <FaX className="w-6 h-6" />
            <MdEmail className="w-6 h-6" />
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
