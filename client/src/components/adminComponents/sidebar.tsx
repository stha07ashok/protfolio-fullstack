import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarData } from "@/constants/sidebar";

const Dashboard = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      <div className="w-64">
        <ul className="space-y-3">
          {sideBarData.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li key={index} className="m-4">
                <Link
                  href={item.href}
                  className={`block cursor-pointer px-4 py-2 rounded-lg
                    ${
                      isActive
                        ? "bg-green-500 dark:bg-blue-500 text-white"
                        : "text-gray-700 dark:text-white hover:bg-green-500 dark:hover:bg-blue-500 transition ease-in-out"
                    }
                  `}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
