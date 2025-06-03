import React from "react";
import Logo from "../logo";
import Dark from "../darkMode";
import Link from "next/link";

const Navbar = () => {
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
        <Link
          href="/admin/login"
          className="flex items-center p-4 py-2 border-2 rounded-full shadow-lg "
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
