"use client";
import { AboutMeData } from "@/constants/aboutMe";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSquares from "@/utils/AnimatedSquares";

const AboutMe = () => {
  const sections = AboutMeData;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0.9 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 4], [0.9555, 1.21]);
  const opacityProgress = useTransform(scrollYProgress, [0, 2], [0, 2]);

  return (
    <motion.div
      id="aboutme"
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-10 "
    >
      <AnimatedSquares />
      <div className="text-3xl font-bold mt-16">About Me</div>
      <div className="text-lg leading-relaxed max-w-3xl  ">
        I&apos;m a passionate{" "}
        <span className="font-semibold">Full-Stack Developer</span> and can
        build modern web applications. I&apos;m committed to writing clean,
        maintainable code and staying up-to-date with emerging technologies. I
        strongly advocate for user-centric design and accessibility.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-2xl border-2 border-green-500 dark:border-white shadow p-6 text-left transition-all duration-300 ease-in-out hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
            <ul className="list-disc list-inside space-y-1">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutMe;
