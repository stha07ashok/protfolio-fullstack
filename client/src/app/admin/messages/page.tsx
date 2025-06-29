"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "@/baseUrl/baseUrl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

interface Message {
  Name: string;
  Email: string;
  Phone?: string;
  Address?: string;
  MessageText: string;
  Service?: string;
  DateTime?: string;
}

const PAGE_SIZE = 6;

const Messages: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (loading) return; // Wait for auth loading to finish

    if (!isLoggedIn) {
      router.push("/admin/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/admin/message/getMessage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedMessages = response.data.data.sort(
          (a: Message, b: Message) =>
            new Date(b.DateTime || "").getTime() -
            new Date(a.DateTime || "").getTime()
        );

        setMessages(sortedMessages);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [isLoggedIn, loading, router]);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const currentMessages = messages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (loading || isLoading)
    return <div className="p-6 text-center">Loading...</div>;

  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Messages
      </h2>

      {messages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {currentMessages.map((msg, index) => (
              <div
                key={msg.Email + msg.DateTime + index}
                className="p-4 border-2 border-green-500 dark:border-blue-500 rounded-xl shadow-lg text-sm sm:text-base"
              >
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {msg.Name}
                  </p>
                  <p>
                    <strong>Email:</strong> {msg.Email}
                  </p>
                  {msg.Phone && (
                    <p>
                      <strong>Phone:</strong> {msg.Phone}
                    </p>
                  )}
                  {msg.Address && (
                    <p>
                      <strong>Address:</strong> {msg.Address}
                    </p>
                  )}
                  <p>
                    <strong>Message:</strong> {msg.MessageText}
                  </p>
                  {msg.Service && (
                    <p>
                      <strong>Service:</strong> {msg.Service}
                    </p>
                  )}
                  {msg.DateTime && (
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(msg.DateTime).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border border-green-500 dark:border-blue-500 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-500 hover:text-white dark:hover:bg-blue-500"
              }`}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded border border-green-500 dark:border-blue-500 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-500 hover:text-white dark:hover:bg-blue-500"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">No messages found.</p>
      )}
    </div>
  );
};

export default Messages;
