"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AnimatedSquares from "@/utils/AnimatedSquares";
import axios from "axios";
import getBaseUrl from "@/baseUrl/baseUrl";

type ProjectType = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  stack: string[];
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0.9 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 4], [0.9555, 1.21]);
  const opacityProgress = useTransform(scrollYProgress, [0, 2], [0, 2]);

  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  );
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${getBaseUrl()}/admin/getallprojectsfrontend`
        );
        setProjects(res.data?.data ?? []);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch projects"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading)
    return <div className="text-center py-10">Loading projects...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
      <motion.div
        id="projects"
        ref={ref}
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-10 "
      >
        <AnimatedSquares />
        <div className="text-3xl font-bold mt-16">Projects</div>

        <div className="text-center">
          <button className="border-2 rounded-full shadow-md border-green-500 dark:border-white px-4 py-2 text-sm sm:text-base hoverEffect">
            Web Development
          </button>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination]}
          className="w-full h-full custom-swiper-nav flex items-center justify-between"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div
                className="rounded-2xl shadow-lg p-4 m-3 flex flex-col border border-green-500 dark:border-white transition-all hover:scale-[1.03] duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-40 sm:h-56 md:h-64 object-fill rounded-2xl mb-3"
                  unoptimized
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-sm mb-2">{project.category}</p>
                <p className="text-sm  mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex gap-4 mt-auto">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank">
                      <FaGithub className="text-xl hover:text-black dark:hover:text-white" />
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank">
                      <FaExternalLinkAlt className="text-xl hover:text-black dark:hover:text-white" />
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="mt-24 bg-gradient-to-r from-green-500 to-emerald-200 dark:from-blue-700 dark:to-violet-950 rounded-full shadow-2xl p-6 sm:p-8 max-w-xs sm:max-w-md md:max-w-lg w-full relative border-2 mx-4 sm:mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-1 right-4 text-2xl text-white hover:text-red-500"
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>

              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={500}
                height={300}
                className="w-[280px] sm:w-full sm:h-full h-[130px] object-fill rounded-lg mb-4 mx-auto"
                unoptimized
              />

              <h3 className="text-md sm:text-2xl font-bold mb-2 ml-4 ">
                {selectedProject.title}
              </h3>

              <p className="text-md sm:text-sm mb-2 ml-4">
                {selectedProject.category}
              </p>

              <p className="text-sm sm:text-base mb-4 ml-4">
                {selectedProject.description}
              </p>

              <p className="text-sm dark:text-gray-300 mb-4 mx-2 sm:mx-20 sm:text-md line-clamp-2 flex flex-wrap gap-2">
                {selectedProject.stack?.map((tech, i) => (
                  <span
                    key={i}
                    className="flex items-center bg-white/20 px-2 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </p>

              <div className="flex gap-6 mt-2 text-xl sm:text-2xl justify-center">
                {selectedProject.githubUrl && (
                  <Link href={selectedProject.githubUrl} target="_blank">
                    <FaGithub className="hover:text-black dark:hover:text-white" />
                  </Link>
                )}
                {selectedProject.liveUrl && (
                  <Link href={selectedProject.liveUrl} target="_blank">
                    <FaExternalLinkAlt className="hover:text-black dark:hover:text-white" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
