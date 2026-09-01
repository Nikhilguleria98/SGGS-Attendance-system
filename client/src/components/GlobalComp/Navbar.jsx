import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "./logincomp/LoginDrawer";

const Navbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu state
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Drawer state

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  // Auto-navigation scroll handler (Cycles Home -> About Us -> Contact Us -> Home)
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= totalHeight - 10) {
        if (location.pathname === "/") {
          navigate("/about-us");
          window.scrollTo(0, 0);
        } else if (location.pathname === "/about-us") {
          navigate("/contact-us");
          window.scrollTo(0, 0);
        } else if (location.pathname === "/contact-us") {
          navigate("/");
          window.scrollTo(0, 0);
        }
      }
    };

    const handleOpenLogin = () => setIsLoginOpen(true);
    window.addEventListener("openLogin", handleOpenLogin);

    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("openLogin", handleOpenLogin);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location.pathname, navigate]);

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-white shadow-md border-t-4 border-[#c8102e]">
        <nav className="w-full mx-auto px-4 lg:px-8 py-2 flex items-center justify-between">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center outline-none">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="/sggslogo.png"
                alt="SGGS World University Logo"
                className="h-12 w-auto object-contain"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-base font-semibold transition-colors duration-300 ${
                    isActive ? "text-[#c8102e]" : "text-gray-700 hover:text-[#c8102e]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="desktop-active-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#c8102e] rounded-t-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden md:flex justify-end w-[10%] min-w-[100px]">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginOpen(true)}
              className="bg-[#00529b] text-white font-semibold px-6 py-2.5 rounded shadow-sm hover:bg-[#003d73] hover:shadow-md transition-all duration-300 whitespace-nowrap"
            >
              Login
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-800 hover:text-[#c8102e] transition-colors outline-none ml-auto"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white border-b border-gray-100 shadow-inner"
            >
              <div className="flex flex-col px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded text-lg font-medium transition-all ${
                        isActive
                          ? "bg-red-50 text-[#c8102e] border-l-4 border-[#c8102e]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#c8102e] border-l-4 border-transparent"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                <motion.div whileTap={{ scale: 0.98 }} className="pt-4">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="block w-full text-center bg-[#00529b] text-white font-bold py-3 rounded shadow-sm hover:bg-[#003d73] transition-colors"
                  >
                    Login
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Render the Drawer Component */}
      <LoginDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;