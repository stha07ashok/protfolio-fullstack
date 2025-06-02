// components/Dots.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useGetActive from "../utils/useGetActive";
import { navbarData } from "@/constants/navbar";

const Dots = () => {
  const { isActive, scrollToSection } = useGetActive();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-3xl shadow-lg">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="flex flex-col gap-4 items-center"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, delay: 1.0 },
            }}
          >
            {navbarData.map((item, idx) => (
              <motion.div
                key={`loader-${item.href}-${idx}`}
                className="w-6 h-6 border border-[#3b82f6] rounded-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 1, 0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: idx * 0.1,
                }}
              >
                <motion.div
                  className="w-4 h-4 bg-[#3b82f6] rounded-full"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.1,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                  ease: "easeOut",
                },
              },
            }}
          >
            {navbarData.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <div
                  key={`${item.href}-${idx}`}
                  onClick={() => scrollToSection(item.href)}
                  style={{ cursor: "pointer" }}
                >
                  <motion.div
                    className={`group flex items-center justify-center gap-2 w-6 h-6 border rounded-full transition-all ${
                      active ? "border-[#3b82f6]" : "border-[#595959]"
                    } hover:border-white`}
                    initial={false}
                    animate={{
                      scale: active ? 1.25 : 1,
                      borderColor: active ? "#3b82f6" : "#595959",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover="hover"
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: 10,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                      hover: {
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      },
                    }}
                  >
                    <motion.div
                      className={`w-4 h-4 rounded-full transition-all ${
                        active ? "bg-[#3b82f6]" : "bg-[#595959]"
                      } group-hover:bg-white`}
                      animate={{
                        scale: active ? 1.2 : 1,
                        backgroundColor: active ? "#3b82f6" : "#595959",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{ scale: 1.2, backgroundColor: "#fff" }}
                      variants={{
                        hover: {
                          scale: 1.2,
                          transition: { duration: 0.2 },
                        },
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dots;
