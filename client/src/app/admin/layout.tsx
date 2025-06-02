// src/app/admin/layout.tsx
import React, { ReactNode } from "react";
import "../globals.css"; // Optional: only if needed
import Navbar from "@/components/adminComponents/navbar";
import Footer from "@/components/adminComponents/footer";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
