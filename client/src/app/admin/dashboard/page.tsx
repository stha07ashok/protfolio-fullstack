"use client";
import getBaseUrl from "@/baseUrl/baseUrl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 3 columns * 3 rows

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [projectsRes, messagesRes] = await Promise.all([
          fetch(`${getBaseUrl()}/admin/getallprojects`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${getBaseUrl()}/admin/message/getMessage`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const projectsData = await projectsRes.json();
        const messagesData = await messagesRes.json();

        setProjects(projectsData.data || []);
        setMessages(messagesData.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Ashok !!</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg shadow-lg border-2 border-green-500 dark:border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Project Stats</h2>
          <p>Total Projects: {projects.length}</p>
        </div>
        <div className="p-4 rounded-lg shadow-lg border-2 border-green-500 dark:border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Message Stats</h2>
          <p>Total Messages: {messages.length}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Projects grid"
            >
              {currentProjects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border-2 border-green-500 dark:border-500 rounded-lg shadow-lg p-4 flex flex-col hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    src={
                      typeof project.image === "string"
                        ? project.image
                        : project.image.src || ""
                    }
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-40 sm:h-56 md:h-48 object-cover rounded-2xl mb-3"
                    unoptimized
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm mb-2">{project.category}</p>
                  <p className="text-sm dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                      >
                        <FaGithub className="text-xl hover:text-black dark:hover:text-white" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live site`}
                      >
                        <FaExternalLinkAlt className="text-xl hover:text-black dark:hover:text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls: only show if more than one page */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <span className="text-sm pt-1" aria-live="polite">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
