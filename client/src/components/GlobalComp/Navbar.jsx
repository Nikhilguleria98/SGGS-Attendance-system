import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-700"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-700"
        >
          CollegeLogo
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact-us" className={navLinkClass}>
            Contact Us
          </NavLink>

          <NavLink
            to="/login"
            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col px-5 py-4 space-y-4">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact-us"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Contact Us
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-blue-700 text-white text-center py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;