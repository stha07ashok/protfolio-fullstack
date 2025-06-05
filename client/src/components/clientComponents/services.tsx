import { servicesData } from "@/constants/services";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSquares from "@/utils/AnimatedSquares";

const Services = () => {
  const currentServices = servicesData;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0.9 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 4], [0.9555, 1.21]);
  const opacityProgress = useTransform(scrollYProgress, [0, 2], [0, 2]);

  return (
    <motion.div
      id="services"
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-10"
    >
      <AnimatedSquares />
      <div className="text-3xl font-bold mt-16">Services I Provide</div>
      <div className="flex flex-col items-center justify-center gap-6 w-full ">
        <button className="border-2 rounded-full shadow-lg border-green-500 dark:border-white px-3 py-2 hoverEffect">
          Web Development
        </button>

        <div className=" gap-6 mx-48 px-7 py-5 hidden md:block">
          {currentServices.map((project, idx) => (
            <div
              key={idx}
              className="rounded-2xl shadow-lg p-3 flex flex-col items-start border-2 border-green-500 dark:border-white transition-all duration-300  ease-in-out hover:scale-105"
            >
              <div className="text-start px-2 py-5">{project.description}</div>
              <div className=" mb-2 px-2 py-5 text-left">
                <span className="text-xl font-semibold my-5">
                  Technologies I use:
                </span>

                <div className="mt-5">
                  frontend: <span>{project.frontend}</span>
                </div>
                <div>
                  backend: <span>{project.backend}</span>
                </div>
                <div>
                  database: <span>{project.database}</span>
                </div>
                <div>
                  tools: <span>{project.tools}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
