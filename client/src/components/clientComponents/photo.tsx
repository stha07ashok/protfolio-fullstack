"use client";
import React from "react";
import hero from "@/images/ashok.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Photo = () => {
  const { theme } = useTheme();

  // Updated: Inner circle is black in light mode
  const circleColors =
    theme === "dark"
      ? ["rgb(29, 78, 216)", "white"]
      : ["rgb(34, 197, 94)", "black"];

  const circleVarient = {
    initial: {
      strokeDasharray: "24 10 0 0",
      rotate: 0,
      opacity: 0,
    },
    animate: (index: number) => ({
      strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22"],
      rotate: [120, 360],
      opacity: 1,
      transition: {
        strokeDasharray: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        },
        opacity: {
          duration: 0.4,
          delay: 1.4 + index * 0.4,
          ease: "easeIn",
        },
      },
    }),
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] mix-blend-lighten overflow-hidden rounded-full">
            <Image
              src={hero}
              alt="heroImg"
              width={500}
              height={500}
              quality={100}
              className="object-cover w-full h-full sm:w-fit sm:h-fit rounded-full"
              priority
            />
          </div>
        </motion.div>

        <svg
          className="w-[300px] lg:w-[506px] h-[300px] lg:h-[506px]"
          viewBox="0 0 506 506"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {circleColors.map((color, index) => (
            <motion.circle
              key={index}
              cx="253"
              cy="253"
              r={240 - index * 15}
              stroke={color}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={circleVarient}
              initial="initial"
              animate="animate"
              custom={index}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default Photo;
