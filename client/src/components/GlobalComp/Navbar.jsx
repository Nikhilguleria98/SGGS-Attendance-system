import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginDrawer from "./logincomp/LoginDrawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 shadow-[0_10px_40px_rgba(22,43,74,0.08)] backdrop-blur">
        <nav className="mx-auto flex w-full items-center justify-between px-4 py-3 lg:px-8">
          <div className="shrink-0">
            <NavLink to="/" className="flex items-center gap-3 outline-none">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#162b4a_0%,_#c00021_100%)] text-lg font-bold text-white shadow-lg"
              >
                SG
              </motion.div>
              <div className="leading-tight">
                <div className="text-lg font-bold tracking-tight text-[#162b4a]">SGGS</div>
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Attendance</div>
              </div>
            </NavLink>
          </div>

          <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `relative px-3 py-2 text-base font-semibold transition-colors duration-300 ${isActive ? "text-[#c00021]" : "text-slate-700 hover:text-[#c00021]"}`}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="desktop-active-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-md bg-[#c00021]"
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

          <div className="hidden min-w-[110px] justify-end md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#162b4a] px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#162b4a]/15 transition-all hover:bg-[#0f1d33]"
            >
              <ShieldCheck size={16} />
              Login
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setOpen(!open)}
            className="ml-auto rounded-full p-2 text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-slate-100 bg-white/95 md:hidden"
            >
              <div className="flex flex-col space-y-2 px-6 py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `block rounded-xl px-4 py-3 text-lg font-medium transition-all ${isActive ? "bg-[#fff1f3] text-[#c00021]" : "text-slate-700 hover:bg-slate-50 hover:text-[#162b4a]"}`}
                  >
                    {item.name}
                  </NavLink>
                ))}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#162b4a] px-4 py-3 font-semibold text-white"
                >
                  <ShieldCheck size={16} />
                  Login
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;