import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";

import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto h-screen lex flex-col px-4 ">
      <div className="pt-8">
        <Logo />
      </div>
      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="hidden sm:block flex-1">
          <img src={authImage} alt="Authentication" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
