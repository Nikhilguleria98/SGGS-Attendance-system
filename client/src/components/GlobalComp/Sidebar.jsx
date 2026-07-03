import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { sidebarMenus } from "../../config/sidebarConfig";

const Sidebar = ({
  role,
  items,
  isCollapsed = false,
  setIsCollapsed = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
  logo,
  title = "UNIVERSITY",
  loginPath = "/",
}) => {
  const navigate = useNavigate();

  // Resolve role dynamically and map config
  const activeRole = (role || localStorage.getItem("role") || "student").toLowerCase();
  const menuItems = items || sidebarMenus[activeRole] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setIsMobileOpen(false);
    navigate(loginPath);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Global Sidebar */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          flex flex-col
          bg-[#162b4a]
          text-white
          transition-all
          duration-300
          ease-in-out

          ${isCollapsed ? "lg:w-20" : "lg:w-64"}

          ${
            isMobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo Section */}
        <div className="relative flex h-24 items-center justify-center border-b border-gray-700/50 p-4">
          {logo ? (
            <img
              src={logo}
              alt="University Logo"
              className={`object-contain ${
                isCollapsed && !isMobileOpen
                  ? "h-10 w-10"
                  : "h-14 w-14"
              }`}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <span className="text-xl font-bold text-[#c00021]">
                  SG
                </span>
              </div>

              {(!isCollapsed || isMobileOpen) && (
                <span className="mt-1 text-[10px] font-semibold">
                  {title}
                </span>
              )}
            </div>
          )}

          {/* Mobile Close */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute right-3 top-3 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Dynamic Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsMobileOpen(false)}
                title={
                  isCollapsed && !isMobileOpen
                    ? item.label
                    : ""
                }
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-3
                    transition-colors

                    ${
                      isActive
                        ? "bg-[#c00021] text-white font-semibold"
                        : "text-gray-300 hover:bg-[#c00021]/80 hover:text-white"
                    }
                  `
                }
              >
                {Icon && (
                  <Icon
                    size={24}
                    className="min-w-[24px]"
                  />
                )}

                {(!isCollapsed || isMobileOpen) && (
                  <span className="whitespace-nowrap text-[15px] font-medium">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-700/50 p-3">
          <button
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-lg
              px-3 py-3
              text-left
              text-gray-300
              transition-colors
              hover:bg-[#c00021]/80
              hover:text-white
            "
            title={
              isCollapsed && !isMobileOpen
                ? "Logout"
                : ""
            }
          >
            <LogOut
              size={24}
              className="min-w-[24px]"
            />

            {(!isCollapsed || isMobileOpen) && (
              <span className="text-[15px] font-medium">
                Logout
              </span>
            )}
          </button>
        </div>

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="
            absolute -right-3 top-28
            z-50
            hidden lg:flex
            rounded-full
            border border-gray-200
            bg-[#c00021]
            p-1
            text-white
            shadow-lg
            hover:bg-[#a0001a]
          "
          aria-label={
            isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;