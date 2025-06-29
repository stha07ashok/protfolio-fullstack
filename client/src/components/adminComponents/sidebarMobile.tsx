import React, { useEffect, useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { motion, AnimatePresence } from "framer-motion";
import { navbarData } from "@/constants/navbar";
import Dark from "../darkMode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import { sideBarData } from "@/constants/sidebar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const SidebarMobile: React.FC<Props> = ({ pathname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
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

  const handleLogout = async () => {
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("authChange"));
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    await Swal.fire({
      position: "top",
      icon: "success",
      title: "Logged out",
      text: "Logout successful!",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      customClass: {
        popup:
          "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700",
        title: "font-semibold",
      },
    });

    router.push("/admin");
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle sidebar"
        aria-label="Toggle sidebar"
      >
        <GoSidebarExpand className="text-2xl mt-1 mr-2 font-bold" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={sidebarRef}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 right-0 w-48 shadow-lg border rounded-md p-4 z-50"
            >
              <nav className="flex flex-col gap-3">
                <div className="w-64">
                  {sideBarData.map((item, index) => {
                    return (
                      <div key={index} className="m-4">
                        <Link
                          href={item.href}
                          className={`block cursor-pointer px-4 py-2 rounded-lg transition ease-in-out hoverEffect`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center mx-8 ">
                  <Dark />

                  {isLoggedIn ? (
                    <div className="relative">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center p-2 rounded-full transition-colors hoverEffect"
                      >
                        <FaRegCircleUser className="text-2xl text-black dark:text-white " />
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
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarMobile;
