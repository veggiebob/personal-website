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
        <main className="text-center flex flex-col items-center pt-10 pb-8">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
