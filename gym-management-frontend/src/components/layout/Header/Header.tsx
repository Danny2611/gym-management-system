import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import classNames from "classnames";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import Button from "../../common/Button";
import RoleBasedDropdown from "~/components/dashboard/header/RoleBasedDropdown"; // Import UserDropdown
import { useAuth } from "../../../contexts/AuthContext";

interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    children: [
      { name: "Our Team", path: "/about/team" },
      { name: "Our Story", path: "/about/story" },
      { name: "Testimonials", path: "/about/testimonials" },
    ],
  },
  {
    name: "Services",
    path: "/services",
    children: [
      { name: "Personal Training", path: "/services/personal-training" },
      { name: "Group Classes", path: "/services/group-classes" },
      { name: "Nutrition Plans", path: "/services/nutrition-plans" },
    ],
  },
  { name: "Schedule", path: "/schedule" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const scrollPosition = useScrollPosition();
  const { isAuthenticated } = useAuth();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={classNames(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        {
          "bg-white shadow-md": scrollPosition > 50 || mobileMenuOpen,
          "bg-transparent": scrollPosition <= 50 && !mobileMenuOpen,
        },
      )}
    >
      {/* Top Bar */}
      <div className="hidden bg-[#0D2E4B] py-2 text-white md:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <BsFillTelephoneFill className="mr-2" />
              <span>+1 800 123 4567</span>
            </div>
            <div className="flex items-center text-sm">
              <IoMdMail className="mr-2" />
              <span>info@fittlife.com</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              className="transition-colors hover:text-[#0CC6F0]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="transition-colors hover:text-[#0CC6F0]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="transition-colors hover:text-[#0CC6F0]"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="z-10">
          <img
            src="/images/logo-main.png"
            alt="FittLife"
            className="h-12 md:h-16"
            style={{
              filter:
                scrollPosition <= 50 && !mobileMenuOpen
                  ? "brightness(0) invert(1)"
                  : "none",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center lg:flex">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="group relative">
                {item.children ? (
                  <>
                    <button
                      className={classNames(
                        "flex items-center text-lg font-semibold",
                        {
                          "text-white": scrollPosition <= 50 && !mobileMenuOpen,
                          "text-[#0D2E4B] hover:text-[#0CC6F0]":
                            scrollPosition > 50 || mobileMenuOpen,
                        },
                      )}
                      onClick={() => {}}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="invisible absolute left-0 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.path}
                            className={({ isActive }) =>
                              classNames(
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                                { "bg-gray-100": isActive },
                              )
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      classNames("text-lg font-semibold", {
                        "text-white":
                          scrollPosition <= 50 && !mobileMenuOpen && !isActive,
                        "text-[#0D2E4B] hover:text-[#0CC6F0]":
                          scrollPosition > 50 || mobileMenuOpen || isActive,
                        "text-[#0CC6F0]": isActive,
                      })
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div className="ml-16">
              <RoleBasedDropdown />
            </div>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="primary"
              size="medium"
              className="ml-16 bg-[#0CC6F0] hover:bg-[#0AB5DC]"
            >
              Đăng nhập
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="z-10 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <HiOutlineX className="h-6 w-6 text-[#0D2E4B]" />
          ) : (
            <HiOutlineMenu
              className={classNames("h-6 w-6", {
                "text-white": scrollPosition <= 50,
                "text-[#0D2E4B]": scrollPosition > 50,
              })}
            />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={classNames(
            "fixed inset-0 flex flex-col bg-white transition-all duration-300 lg:hidden",
            {
              "visible opacity-100": mobileMenuOpen,
              "invisible opacity-0": !mobileMenuOpen,
            },
          )}
        >
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link to="/" className="z-10">
              <img src="/images/logo.png" alt="FittLife" className="h-12" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="z-10"
              aria-label="Close menu"
            >
              <HiOutlineX className="h-6 w-6 text-[#0D2E4B]" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center overflow-auto py-10">
            <ul className="w-full max-w-sm space-y-6 px-4">
              {navItems.map((item) => (
                <li key={item.name} className="w-full">
                  {item.children ? (
                    <div>
                      <button
                        className="flex w-full items-center justify-between text-left text-xl font-semibold text-[#0D2E4B]"
                        onClick={() => toggleDropdown(item.name)}
                      >
                        {item.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={classNames(
                            "h-4 w-4 transition-transform",
                            {
                              "rotate-180": activeDropdown === item.name,
                            },
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className={classNames(
                          "ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300",
                          {
                            "max-h-0 opacity-0": activeDropdown !== item.name,
                            "max-h-96 opacity-100":
                              activeDropdown === item.name,
                          },
                        )}
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.path}
                            className={({ isActive }) =>
                              classNames("block py-2 text-lg font-medium", {
                                "text-[#0CC6F0]": isActive,
                                "text-gray-700 hover:text-[#0CC6F0]": !isActive,
                              })
                            }
                            onClick={toggleMobileMenu}
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        classNames("block text-xl font-semibold", {
                          "text-[#0CC6F0]": isActive,
                          "text-[#0D2E4B] hover:text-[#0CC6F0]": !isActive,
                        })
                      }
                      onClick={toggleMobileMenu}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}
              <li className="mt-8">
                {isAuthenticated ? (
                  <div className="flex justify-center">
                    <RoleBasedDropdown />
                  </div>
                ) : (
                  <Button
                    fullWidth
                    onClick={() => {
                      window.location.href = "/login";
                      toggleMobileMenu();
                    }}
                  >
                    Đăng nhập
                  </Button>
                )}
              </li>
              <li className="mt-8 flex justify-center space-x-6">
                <a
                  href="https://facebook.com"
                  className="text-xl text-[#0D2E4B] hover:text-[#0CC6F0]"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-xl text-[#0D2E4B] hover:text-[#0CC6F0]"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-xl text-[#0D2E4B] hover:text-[#0CC6F0]"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
