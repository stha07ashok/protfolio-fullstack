import React, { useState } from "react";
import { GoSidebarExpand } from "react-icons/go";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { motion, AnimatePresence } from "framer-motion";
import { navbarData } from "@/constants/navbar";
import SocialLinks from "@/constants/socialLinks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const Sidebar: React.FC<Props> = ({ pathname }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector("#" + href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
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
                {navbarData.map((item, index) => {
                  if (index === 0) return null;
                  return (
                    <a
                      key={item.href}
                      href={`#${item.href}`}
                      className={`font-bold text-white ${
                        pathname === item.href ? "font-bold text-white" : ""
                      }`}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                    >
                      {item.title}
                    </a>
                  );
                })}

                <SocialLinks />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
