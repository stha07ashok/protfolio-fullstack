"use client";
import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { FaRegMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="pr-5"
      >
        {theme === "dark" ? (
          <div className="text-[26px] text-black dark:text-white font-bold">
            <FaRegMoon />
          </div>
        ) : (
          <div className="text-[26px] text-black dark:text-white font-bold">
            <BiSun />
          </div>
        )}
      </button>
    </>
  );
}
