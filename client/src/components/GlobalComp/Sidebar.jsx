import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, ChevronLeft, ChevronRight, X } from "lucide-react";

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-[linear-gradient(160deg,_#162b4a_0%,_#0f1d33_100%)] text-white shadow-2xl transition-all duration-300 ease-in-out lg:static ${isCollapsed ? "lg:w-20" : "lg:w-64"} ${isMobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="relative flex h-24 items-center justify-center border-b border-white/10 p-4">
          {logo ? (
            <img
              src={logo}
              alt="University Logo"
              className={`object-contain ${isCollapsed && !isMobileOpen ? "h-10 w-10" : "h-14 w-14"}`}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg shadow-black/10">
                <span className="text-xl font-bold text-[#c00021]">SG</span>
              </div>

              {(!isCollapsed || isMobileOpen) && (
                <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-slate-200">{title}</span>
              )}
            </div>
          )}

          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-2 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed && !isMobileOpen ? item.label : ""}
                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${isActive ? "bg-[#c00021] text-white shadow-lg shadow-[#c00021]/20" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
              >
                {Icon && <Icon size={22} className="min-w-[22px]" />}

                {(!isCollapsed || isMobileOpen) && <span className="whitespace-nowrap text-[15px] font-medium">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-200 transition-colors hover:bg-[#c00021]/80 hover:text-white"
            title={isCollapsed && !isMobileOpen ? "Logout" : ""}
          >
            <LogOut size={22} className="min-w-[22px]" />

            {(!isCollapsed || isMobileOpen) && <span className="text-[15px] font-medium">Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="absolute -right-3 top-28 z-50 hidden rounded-full border border-white/20 bg-[#c00021] p-1 text-white shadow-lg hover:bg-[#a0001a] lg:flex"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">Confirm Logout</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Are you sure you want to logout from your account?</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
                className="rounded-lg bg-[#c00021] px-4 py-2 text-white transition hover:bg-[#a0001a]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;