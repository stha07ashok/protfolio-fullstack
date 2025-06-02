"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const ScrollLine = () => {
  const { theme } = useTheme();

  const borderColor = theme === "dark" ? "rgb(255 255 255)" : "rgb(34 197 94)";

  return (
    <div className="w-full flex items-center justify-center mt-4">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full border-b-2"
        style={{ borderColor }}
      />
    </div>
  );
};

export default ScrollLine;
