import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <main className="container mx-auto px-4 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
