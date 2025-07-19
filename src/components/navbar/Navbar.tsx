import { useCallback, useEffect, useRef, useState } from "react";
import type { ILink } from "../../types/navbar";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "../container/Container";
import logo from "../../assets/website/logo.png";
import { IoIosArrowForward, IoMdArrowDropdown } from "react-icons/io";
import DarkMode from "./DarkMode";
import { FaCartShopping } from "react-icons/fa6";
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import { useShoppingCart } from "../../context/shoppingCart/ShoppingCartProvider";

const navItems: ILink[] = [
  { id: 1, label: "Home", to: "/" },
  { id: 2, label: "Store", to: "/store" },
];
const quickLinks: ILink[] = [
  { id: 3, label: "About us", to: "/about-us" },
  { id: 4, label: "Contact us", to: "/contact-us" },
];
const mobileLinks: ILink[] = [...navItems, ...quickLinks];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartQty } = useShoppingCart();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  const handleMenuClick = () => setIsMenuOpen((prev) => !prev);
  const handleDropdownClick = () => setIsDropdownOpen((prev) => !prev);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    setIsScrolled(!entry.isIntersecting);
  }, []);

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.0,
    });

    const tryObserve = () => {
      const heroElement = document.querySelector(".hero-section");
      if (heroElement) {
        observerRef.current?.observe(heroElement);
      } else {
        setTimeout(tryObserve, 100);
      }
    };

    tryObserve();

    return () => observerRef.current?.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    const cleanup = setupObserver();
    return cleanup;
  }, [setupObserver, location.pathname]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 w-full py-4 duration-200 dark:bg-gray-900 ${
        !isScrolled && location.pathname === "/"
          ? "bg-white/35 backdrop-blur-sm"
          : "bg-white shadow"
      }`}
    >
      <nav>
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <img src={logo} alt="website logo" className="w-10" />
              <p className="font-bold text-2xl">Books</p>
            </div>
            <div className="hidden md:block">
              <ul className="flex gap-5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? "text-primary font-semibold" : ""
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={handleDropdownClick}
                  >
                    <span>Quick links</span>
                    <IoMdArrowDropdown
                      className={`text-2xl transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isDropdownOpen && (
                    <ul className="absolute bg-white dark:bg-gray-900 shadow mt-2 p-3 w-28 z-50">
                      {quickLinks.map((item) => (
                        <li
                          key={item.id}
                          className="px-2 py-1 text-sm rounded duration-200 hover:bg-secondary dark:hover:bg-[rgba(81,147,209,0.4)]"
                        >
                          <Link to={item.to} onClick={handleDropdownClick}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-x-3">
              <DarkMode />
              <Link to="/cart" className="relative">
                <FaCartShopping className="text-2xl" />
                {cartQty !== 0 && (
                  <span className="bg-primary text-white w-[18px] h-[18px] text-center p-[1px] font-bold text-xs inline-block absolute rounded-full -top-2 -right-2">
                    {cartQty}
                  </span>
                )}
              </Link>
              {isMenuOpen ? (
                <IoCloseSharp
                  onClick={handleMenuClick}
                  className="text-3xl cursor-pointer md:hidden"
                />
              ) : (
                <IoMenu
                  onClick={handleMenuClick}
                  className="text-3xl cursor-pointer md:hidden"
                />
              )}
            </div>
          </div>
        </Container>
      </nav>

      <nav className="md:hidden top-20">
        <div
          className={`duration-200 ${
            isMenuOpen
              ? "h-full py-3 opacity-100 translate-y-0 pointer-events-auto"
              : "h-0 opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <Container>
            <div className="flex flex-col justify-between">
              {mobileLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={handleMenuClick}
                  className="flex justify-between gap-x-1 items-center font-medium px-2 py-1 rounded duration-200 hover:bg-secondary dark:hover:bg-[rgba(81,147,209,0.4)]"
                >
                  <p>{item.label}</p>
                  <IoIosArrowForward />
                </Link>
              ))}
            </div>
          </Container>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
