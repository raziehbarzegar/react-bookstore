import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
interface Layout {
  children: React.ReactNode;
}
function Layout({ children }: Layout) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
