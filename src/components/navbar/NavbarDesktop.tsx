import Container from "../container/Container";
import logo from "../../assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import type { ILink } from "../../types/navbar";
import NavbarToggle from "./NavbarToggle";
import { useState } from "react";
import { useShoppingCartContext } from "../../hooks/context/useShoppingCartContext";

interface NavbarDesktop {
  navItems: ILink[];
  quickLinks: ILink[];
  isMenuOpen: boolean;
  handleClick: () => void;
}

function NavbarDesktop({
  navItems,
  quickLinks,
  isMenuOpen,
  handleClick,
}: NavbarDesktop) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const { cartQty } = useShoppingCartContext();

  return (
    <>
      <nav className="py-4 bg-white dark:bg-gray-900 shadow-sm">
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
                          <Link
                            to={item.to}
                            onClick={() => setIsDropdownOpen(false)}
                          >
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
                {cartQty !=0 ? (
                  <span className="bg-primary text-white w-[18px] h-[18px] text-center p-[1px] font-bold text-xs inline-block absolute rounded-full -top-2 -right-2">
                    {cartQty}
                  </span>
                ): <></>}
              </Link>
              <NavbarToggle handleClick={handleClick} isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default NavbarDesktop;
