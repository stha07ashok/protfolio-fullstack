"use client";

import AnimatedSquares from "@/utils/AnimatedSquares";

const Footer = () => {
  return (
    <footer className=" py-1 px-6 border-t-2 border-white shadow-lg bg-gradient-to-r from-green-500 to-emerald-200  dark:bg-gradient-to-r dark:from-blue-700 dark:to-violet-950 ">
      <AnimatedSquares />
      <div className="mt-2 text-center text-md  flex justify-center items-center ">
        © 2025 Ashok Shrestha. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
