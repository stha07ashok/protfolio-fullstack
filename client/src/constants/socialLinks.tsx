"use client";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "next-themes";

const SocialLinks = () => {
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "rgb(59 130 246)" : "rgb(34 197 94)";

  return (
    <div className="w-full flex gap-3">
      <a
        href="https://www.facebook.com/ashokshrestha2003"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
      >
        <FaFacebook
          style={{ color: iconColor }}
          className="text-xl md:text-2xl  hoverEffect"
        />
      </a>
      <a
        href="https://www.instagram.com/_stha07ashok_/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <FaInstagram
          style={{ color: iconColor }}
          className="text-xl md:text-2xl  hoverEffect"
        />
      </a>
      <a
        href="https://github.com/stha07ashok"
        target="_blank"
        rel="noopener noreferrer"
        title="Github"
      >
        <FaGithub
          style={{ color: iconColor }}
          className="text-xl md:text-2xl  hoverEffect"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/ashok-shrestha-a295b3235/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <FaLinkedin
          style={{ color: iconColor }}
          className="text-xl md:text-2xl  hoverEffect"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
