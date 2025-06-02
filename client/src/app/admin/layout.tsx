import React, { ReactNode } from "react";
import "../globals.css";
import Navbar from "@/components/adminComponents/navbar";
import Footer from "@/components/adminComponents/footer";
import ThemeProvider from "@/utils/themeProvider";

export const metadata = {
  title: "Ashok Shrestha - Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
