import { useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-full px-4 py-1.5 text-sm transition-colors",
      isActive
        ? "bg-brand font-medium text-white"
        : "text-text hover:bg-slate-200/60",
    );

  return (
    <header className="bg-white">
      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-8">
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-text-h md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="text-lg font-semibold text-text-h">
            Collabspace
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-56 rounded-full bg-slate-100 pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/30"
            />
          </div>

          {/* Search icon (compact, below lg) */}
          <button className="text-muted-foreground hover:text-foreground lg:hidden">
            <Search className="size-5" />
          </button>

          <button className="relative text-muted-foreground hover:text-foreground">
            <Bell className="size-5" />
            <span className="absolute -top-0.5 right-0 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight text-text-h">
                Mohamed Salah
              </p>
              <p className="text-xs text-muted-foreground">UI/UX</p>
            </div>
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt="Mohamed Salah"
              className="size-9 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-brand font-medium text-white"
                    : "text-text hover:bg-slate-100",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
