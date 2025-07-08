import Container from "../container/Container";
import type { ILink } from "./navbar.types";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

interface NavbarMobile {
  isMenuOpen: boolean;
  mobileLinks: ILink[];
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavbarMobile({
  isMenuOpen,
  mobileLinks,
  setIsMenuOpen,
}: NavbarMobile) {
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav>
      <div
        className={`md:hidden py-3 absolute duration-200 z-50 dark:bg-gray-900 bg-white w-full
            ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            }`}
      >
        <Container>
          <div className="flex flex-col justify-between">
            {mobileLinks.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                onClick={handleLinkClick}
                className="flex justify-between gap-x-1 items-center font-medium px-2 py-1 rounded duration-200 hover:bg-secondary dark:hover:bg-[rgba(81,147,209,0.4)]"
              >
                <p>{item.label} </p>
                <IoIosArrowForward />
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default NavbarMobile;
