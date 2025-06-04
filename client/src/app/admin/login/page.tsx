"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import getBaseUrl from "@/baseUrl/baseUrl";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  interface FormData {
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);

        // Dispatch the authChange event to notify Navbar
        window.dispatchEvent(new Event("authChange"));

        // Optional: Set a timer to remove the token after 1 hour
        setTimeout(() => {
          localStorage.removeItem("token");
          window.dispatchEvent(new Event("authChange")); // Notify logout
          alert("Token has expired! Please login again.");
          router.push("/admin/login");
        }, 3600 * 1000);

        alert("Admin Login successful!");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setMessage("Please provide a valid username and password");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="w-full max-w-sm mx-auto shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border-2"
      >
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                Username is required
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-200  dark:bg-gradient-to-r dark:from-blue-700 dark:to-violet-950 text-white font-bold py-2 px-8 rounded-lg focus:outline-none  transition-all duration-300 cursor-pointer ease-in-out hover:scale-110 border-2"
            >
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
