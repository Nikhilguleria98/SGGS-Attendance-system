import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    // 80% White Theme Base with a Red Accent Border at the top
    <header className="sticky top-0 w-full z-50 bg-white shadow-md border-t-4 border-[#c8102e]">
      <nav className="w-full mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo - Takes exactly 10% of screen width */}
        <div className="w-[10%] min-w-[120px] flex-shrink-0">
          <NavLink to="/" className="flex items-center outline-none">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-xl md:text-2xl font-bold tracking-tight text-[#c8102e]"
            >
              College<span className="text-gray-800">Logo</span>
            </motion.div>
          </NavLink>
        </div>

        {/* Desktop Menu - Centered Links */}
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
                  {/* Red gliding underline for active link */}
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

        {/* Login Button - 10% Blue Accent */}
        <div className="hidden md:flex justify-end w-[10%] min-w-[100px]">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/login"
              className="bg-[#00529b] text-white font-semibold px-6 py-2.5 rounded shadow-sm hover:bg-[#003d73] hover:shadow-md transition-all duration-300 whitespace-nowrap"
            >
              Login
            </NavLink>
          </motion.div>
        </div>

        {/* Mobile Hamburger Button */}
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
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-[#00529b] text-white font-bold py-3 rounded shadow-sm hover:bg-[#003d73] transition-colors"
                >
                  Login
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;