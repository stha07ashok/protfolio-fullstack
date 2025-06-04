"use client";

import React, { useEffect, useState } from "react";
import Logo from "../logo";
import Dark from "../darkMode";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkAuth();

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // Notify listeners about logout
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    router.push("/admin/login");
  };

  return (
    <div
      className="w-full py-6 px-3 md:px-4 lg:px-0 border-b-2 shadow-lg bg-gradient-to-r from-green-500 to-emerald-200 
 border border-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-violet-950"
    >
      <div className="flex flex-row items-center justify-between mx-4">
        <div className="w-full flex justify-between items-center gap-4">
          <Link href="/admin" className="flex items-center mx-4">
            <Logo title="Ashok" subtitle="." />
          </Link>
          <Dark />
        </div>

        {/* Right side */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center p-2 rounded-full transition-colors hoverEffect"
            >
              <FaRegCircleUser className="text-2xl text-black dark:text-white" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-200 dark:bg-dark border rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="flex items-center p-4 py-2 border-2 rounded-full shadow-lg "
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
