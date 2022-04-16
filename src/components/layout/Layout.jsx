import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const loc = useLocation();

  return (
    <>
      <div className="min-h-screen">
        {loc.pathname !== "/" && <Navbar />}
        <main className="mt-8 gap-8 text-center flex flex-col items-center">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
