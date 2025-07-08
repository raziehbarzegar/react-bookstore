import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaInstagram, FaLocationArrow } from "react-icons/fa6";
import { IoIosArrowForward, IoIosPhonePortrait } from "react-icons/io";
import { Link } from "react-router-dom";
import Container from "../container/Container";

const socialLinks = [
  { id: 1, icon: <FaInstagram />, label: "Instagram", href: "#" },
  { id: 2, icon: <FaGithub />, label: "Github", href: "#" },
  { id: 3, icon: <CiLinkedin />, label: "LinkedIn", href: "#" },
];

const footerLinks = [
  {
    id: 4,
    label: "Home",
    to: "/",
  },
  {
    id: 5,
    label: "Store",
    to: "/store",
  },
  {
    id: 6,
    label: "About us",
    to: "/about-us",
  },
  {
    id: 7,
    label: "Contact us",
    to: "/contact-us",
  },
];
function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <Container className="py-6">
        <div className="flex flex-col md:flex-row md:justify-around md:gap-x-12 md:items-center gap-y-2">
          <div>
            <div className="mb-7">
              <h4 className="text-xl font-bold pb-4 md:text-3xl">Book Store</h4>
              <p className="">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Consequatur, inventore commodi.
              </p>
            </div>
          </div>

          <div className="order-1 mt-5 text-gray-600">
            <h5 className="font-bold text-lg text-black dark:text-white">
              Important Links
            </h5>
            {footerLinks.map((item) => (
              <div
                key={item.id}
                className="flex group items-center gap-x-[2px]"
              >
                <IoIosArrowForward className="group-hover:translate-x-1 duration-150" />
                <Link to={item.to}>{item.label}</Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-y-2 md:order-1">
            <div className="flex gap-x-2 mb-3">
              <FaLocationArrow className="text-2xl" /> <p>Shiraz, Iran</p>
            </div>
            <div className="flex gap-x-2">
              <IoIosPhonePortrait className="text-2xl" />
              <p>+98 933 123 1234</p>
            </div>
            <div className="socials mt-2 flex gap-x-3">
              {socialLinks.map((item) => (
                <a key={item.id} href={item.href} className="text-4xl">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
