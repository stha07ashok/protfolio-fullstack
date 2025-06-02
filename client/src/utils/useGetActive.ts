"use client";

import { navbarData } from "@/constants/navbar";
import { useEffect, useState } from "react";

export default function useGetActive() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.7 } // Consider section in view when 50% visible
    );

    // Observe all sections
    navbarData.forEach((menu) => {
      const section = document.getElementById(menu.href);
      if (section) {
        sectionObserver.observe(section);
      }
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  const isActive = (sectionId: string) => {
    return sectionId === activeSection;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { isActive, scrollToSection };
}
