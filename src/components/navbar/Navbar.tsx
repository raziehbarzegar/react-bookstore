import { useState } from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navItems = [
    {
      id: 1,
      label: "Home",
      to: "/",
    },
    {
      id: 2,
      label: "Store",
      to: "/store",
    },
  ];
  const quickLinks = [
    { id: 3, label: "About us", to: "/about-us" },
    { id: 4, label: "Contact us", to: "/contact-us" },
  ];

  const mobileLinks = [...navItems, ...quickLinks];
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <>
      <NavbarDesktop
        navItems={navItems}
        quickLinks={quickLinks}
        isMenuOpen={isMenuOpen}
        handleClick={toggleMenu}
      />
      <NavbarMobile
        isMenuOpen={isMenuOpen}
        mobileLinks={mobileLinks}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  );
}

export default Navbar;
