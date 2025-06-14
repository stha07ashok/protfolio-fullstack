"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/clientComponents/navbar";
import Footer from "@/components/clientComponents/footer";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="site-layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
