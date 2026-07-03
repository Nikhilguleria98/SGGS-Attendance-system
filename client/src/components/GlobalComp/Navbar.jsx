import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "./logincomp/LoginDrawer"; // Import your new component here

const Navbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu state
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Drawer state

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    
  ];

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-white shadow-md border-t-4 border-[#c8102e]">
        <nav className="w-full mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <div className="w-[10%] min-w-30 shrink-0">
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