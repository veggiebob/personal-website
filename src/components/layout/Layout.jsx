import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="m-8 gap-8 text-center flex flex-col items-center">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
