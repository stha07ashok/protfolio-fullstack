import React, { ReactNode } from "react";
import "../globals.css";
import { AuthProvider } from "@/context/authContext";
import AdminLayout from "@/components/adminComponents/adminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ashok Shrestha - Admin",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
