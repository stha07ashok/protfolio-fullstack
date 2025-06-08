"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SwalImport from "sweetalert2";
import getBaseUrl from "@/baseUrl/baseUrl";

const Swal = SwalImport as unknown as {
  fire: (options: any) => Promise<any>;
};

interface Message {
  Name: string;
  Email: string;
  Phone?: string;
  Address?: string;
  Message: string;
  Service?: string;
  DateTime?: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/admin/messages/getMessages`
        );
        setMessages(response.data.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load messages.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load messages from the server.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold"
        >
          Loading messages...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Received Messages
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No messages found.
          </p>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg, index) => (
              <div
                key={msg.Email + msg.DateTime + index}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-5"
              >
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
                {msg.Service && (
                  <p>
                    <strong>Service:</strong> {msg.Service}
                  </p>
                )}
                <p>
                  <strong>Message:</strong> {msg.Message}
                </p>
                {msg.DateTime && (
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(msg.DateTime).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Messages;
