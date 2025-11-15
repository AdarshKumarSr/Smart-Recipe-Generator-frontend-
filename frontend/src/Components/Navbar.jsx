import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);

  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  // 🧠 Smooth Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 
          border-b border-orange-100/50 shadow-[0_2px_20px_rgba(0,0,0,0.05)]
          transition-transform duration-300 
          ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight bg-linear-to-r 
              from-orange-500 to-red-500 bg-clip-text text-transparent"
          >
            Cuisinex
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 
                    ${isActive(link.path)
                      ? "bg-orange-500 text-white shadow-md shadow-orange-400/30"
                      : "hover:text-orange-500 hover:bg-orange-100/40"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* AUTH SECTION (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <button
                onClick={() => setOpenLogin(true)}
                className="px-5 py-2 rounded-lg font-medium border border-orange-400 
                  text-orange-500 hover:bg-orange-50 hover:shadow 
                  transition-all duration-200"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={user?.picture || ""}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border border-orange-300 
                  shadow-sm object-cover bg-gray-200"
                />
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium 
                    hover:bg-red-600 transition-all shadow-inner"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-orange-100 shadow-lg py-4 animate-fadeIn">
            <ul className="flex flex-col items-center space-y-4 font-medium text-gray-700">

              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 
                      ${isActive(link.path)
                        ? "bg-orange-500 text-white shadow"
                        : "hover:text-orange-500 hover:bg-orange-100/50"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* AUTH BUTTONS MOBILE */}
              <li className="flex space-x-3 pt-2">
                {!user ? (
                  <button
                    onClick={() => {
                      setOpenLogin(true);
                      setIsOpen(false);
                    }}
                    className="px-5 py-2 border border-orange-400 text-orange-600 rounded-lg 
                      hover:bg-orange-50 transition-all"
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* LOGIN POPUP */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;
