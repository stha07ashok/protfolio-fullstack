"use client";
import { navbarData } from "@/constants/navbar";
import React, { useState } from "react";
import Logo from "../logo";
import Dark from "../darkMode";
import useGetActive from "@/utils/useGetActive";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

const Navbar = () => {
  const { isActive, scrollToSection } = useGetActive();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed w-full top-5 px-3 md:px-4 lg:px-0 z-20">
      <div
        className="w-full flex justify-between max-w-5xl mx-auto bg-gradient-to-r from-green-500 to-emerald-200 
 border border-white p-3 rounded-full items-center dark:bg-gradient-to-r dark:from-blue-700 dark:to-violet-950"
      >
        {/* Logo */}
        <div onClick={handleLogoClick} className="cursor-pointer">
          <Logo title="<Ashok/>" subtitle="." />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wide font-medium">
          {navbarData.map((item, index) => {
            const active = isActive(item.href);
            let isHome = false;

            if (index === 0) {
              isHome = true;
              return null;
            }
            return (
              <button
                key={item.title}
                onClick={() => scrollToSection(item.href)}
                className={`relative group px-2 py-1 transition duration-300 hover:text-hoverColor hoverEffect ${
                  active && !isHome ? "border-b-2" : ""
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Dark Mode + Mobile */}
        <div className="flex items-center gap-1 ">
          <div className="hoverEffect mt-2">
            <Dark />
          </div>

          <div className="md:hidden ">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              pathname={pathname}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
