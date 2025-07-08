import { IoCloseSharp, IoMenu } from "react-icons/io5";

interface NavbarToggle {
  isMenuOpen: boolean;
  handleClick: () => void;
}
function NavbarToggle({ isMenuOpen, handleClick }:NavbarToggle) {
  return (
    <>
      {isMenuOpen ? (
        <IoCloseSharp
          onClick={handleClick}
          className="text-3xl cursor-pointer md:hidden"
        />
      ) : (
        <IoMenu
          onClick={handleClick}
          className="text-3xl cursor-pointer md:hidden"
        />
      )}
    </>
  );
}

export default NavbarToggle;
