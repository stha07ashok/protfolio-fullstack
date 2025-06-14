"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import getBaseUrl from "@/baseUrl/baseUrl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type LoginFormValues = {
  username: string;
  password: string;
};

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await fetch(`${getBaseUrl()}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        window.dispatchEvent(new Event("authChange"));

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        router.push("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while logging in.",
      });
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Admin Login
        </h2>

        {/* username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register("username", {
              required: "User name is required",
            })}
            className={`w-full p-2 border-2 rounded-md shadow-sm bg-white/5 focus:outline-none ${
              errors.username
                ? "border-red-500 dark:border-red-400"
                : "border-green-500 dark:border-blue-500"
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className={`w-full p-2 border-2 rounded-md shadow-sm bg-white/5 focus:outline-none ${
              errors.password
                ? "border-red-500 dark:border-red-400"
                : "border-green-500 dark:border-blue-500"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-green-500 dark:bg-blue-500 rounded-md text-white font-semibold hover:bg-green-700 dark:hover:bg-blue-700 transition-colors duration-300 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
};

export default AdminLogin;
