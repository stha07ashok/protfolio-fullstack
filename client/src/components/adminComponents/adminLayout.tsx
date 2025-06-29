"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/adminComponents/navbar";
import Footer from "@/components/adminComponents/footer";
import Sidebar from "@/components/adminComponents/sidebar";
import ThemeProvider from "@/utils/themeProvider";
import { useAuth } from "@/context/authContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-row">
          {isLoggedIn && (
            <aside className="w-64 border-r-2 border-white shadow-lg hidden md:flex ">
              <Sidebar />
            </aside>
          )}

          <main className={`flex-1 p-6 ${!isLoggedIn ? "ml-0" : ""}`}>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
