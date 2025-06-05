"use client";
import { useTypeWriter } from "@/hooks/use-type-writer";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Photo from "./photo";
import SocialLinks from "../../constants/socialLinks";

const Hero = () => {
  const { theme } = useTheme();
  const [hasLoaded, setHasLoaded] = useState(false);

  const Description =
    "As a Full Stack Developer, I design and build innovative website solutions, solve problems, and ensure systems are scalable and user-friendly. From creating web apps to optimizing backend systems, I bridge the gap between technology and user needs.";

  const { displayText } = useTypeWriter(Description, 30);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 30, delay: 2 },
    },
  };

  const name = "Ashok Shrestha";

  return (
    <motion.div
      id="home"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.6 }}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
        <div>
          <motion.h3
            className="text-sm sm:text-base font-semibold tracking-wide mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            Full Stack Developer
          </motion.h3>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hello I&apos;m
          </motion.h2>

          <motion.h1
            className="text-hoverColor text-4xl sm:text-5xl md:text-6xl font-bold my-4 flex flex-wrap"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {name.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <div className="w-full min-h-[120px] sm:min-h-[140px] relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.p
              className="text-sm sm:text-base font-normal leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              {hasLoaded ? (
                displayText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      color:
                        theme === "dark"
                          ? "rgb(29, 78, 216)" // blue-700
                          : "rgb(34, 197, 94)", // green-500
                    }}
                    animate={{
                      color:
                        theme === "dark"
                          ? "rgb(255, 255, 255)" // white
                          : "rgb(0, 0, 0)", // black
                    }}
                    transition={{
                      duration: 0.5, // smooth transition
                      delay: 1 + index * 0.03, // start after 2s, with stagger
                    }}
                  >
                    {char}
                  </motion.span>
                ))
              ) : (
                <span>{Description}</span>
              )}
            </motion.p>
          </div>
        </div>

        <div className="mt-14 md:mt-28">
          <SocialLinks />
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
        <Photo />
      </div>
    </motion.div>
  );
};

export default Hero;
