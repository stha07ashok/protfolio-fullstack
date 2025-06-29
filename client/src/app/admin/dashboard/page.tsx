"use client";
import getBaseUrl from "@/baseUrl/baseUrl";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Dashboard = () => {
  const { isLoggedIn, loading, logout } = useAuth();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const [projects, setProjects] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateTokenAndFetchData = async () => {
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      // Optional: Add token expiration check if using JWT
      // if (isTokenExpired(token)) {
      //   logout();
      //   router.replace("/admin/login");
      //   return;
      // }

      setIsLoading(true);
      setError(null);

      try {
        const [projectsRes, messagesRes] = await Promise.all([
          fetch(`${getBaseUrl()}/admin/getallprojects`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // If using cookies
          }),
          fetch(`${getBaseUrl()}/admin/message/getMessage`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // If using cookies
          }),
        ]);

        // Check for 401/403 responses
        if (projectsRes.status === 401 || projectsRes.status === 403) {
          logout();
          router.replace("/admin/login");
          return;
        }

        if (messagesRes.status === 401 || messagesRes.status === 403) {
          logout();
          router.replace("/admin/login");
          return;
        }

        // Check if responses are OK
        if (!projectsRes.ok) {
          throw new Error(
            `Failed to fetch projects: ${projectsRes.statusText}`
          );
        }

        if (!messagesRes.ok) {
          throw new Error(
            `Failed to fetch messages: ${messagesRes.statusText}`
          );
        }

        const projectsData = await projectsRes.json();
        const messagesData = await messagesRes.json();

        setProjects(projectsData.data || []);
        setMessages(messagesData.data || []);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch dashboard data"
        );

        // If it's an authentication error, redirect to login
        if (
          err instanceof Error &&
          (err.message.includes("401") ||
            err.message.includes("403") ||
            err.message.includes("Authentication"))
        ) {
          logout();
          router.replace("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only run if not loading and logged in
    if (!loading && isLoggedIn) {
      validateTokenAndFetchData();
    } else if (!loading && !isLoggedIn) {
      router.replace("/admin/login");
    }
  }, [isLoggedIn, loading, router, logout]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold mb-2">Error Loading Dashboard</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Admin!</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg shadow-lg border-2 border-green-500 dark:border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Project Stats</h2>
          <p>Total Projects: {projects.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            Showing {Math.min(projectsPerPage, projects.length)} per page
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg border-2 border-green-500 dark:border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Message Stats</h2>
          <p>Total Messages: {messages.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Projects</h2>
          {projects.length > 0 && (
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Projects grid"
            >
              {currentProjects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="border-2 border-green-500 dark:border-blue-500 rounded-lg shadow-lg p-4 flex flex-col hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                >
                  {project.image && (
                    <Image
                      src={
                        typeof project.image === "string"
                          ? project.image
                          : project.image.src || "/placeholder-project.png"
                      }
                      alt={project.title || "Project image"}
                      width={500}
                      height={300}
                      className="w-full h-40 sm:h-56 md:h-48 object-cover rounded-2xl mb-3"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-project.png";
                      }}
                    />
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="text-sm mb-2">
                    {project.category || "No category"}
                  </p>
                  <p className="text-sm dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description || "No description available"}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        <FaGithub className="text-xl" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live site`}
                        className="hover:text-black dark:hover:text-white transition-colors"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 border-2 border-green-500 dark:border-blue-500 shadow-lg rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                  className="px-4 py-2 border-2 border-green-500 dark:border-blue-500 shadow-lg rounded disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
