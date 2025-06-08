"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useScroll, useTransform, motion } from "framer-motion";
import axios from "axios";
import getBaseUrl from "@/baseUrl/baseUrl";
import Success from "./success";

type FormData = {
  Name: string;
  Email: string;
  Phone?: string;
  Address?: string;
  Message: string;
  Service?: string;
};

const ContactForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0.9 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 4], [0.9555, 1.21]);
  const opacityProgress = useTransform(scrollYProgress, [0, 2], [0, 2]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [status, setStatus] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setStatus("");
    try {
      const url = `${getBaseUrl()}/admin/message/postMessage`;
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.message) {
        setSuccess(true);
        setStatus("Success! Your message has been sent.");
        reset();
      } else {
        setStatus("Error! Unable to send your message.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      setStatus("Error! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-10 max-w-xl mx-auto text-center">
        <Success status={status} />
      </div>
    );
  }

  return (
    <motion.div
      id="contact"
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="relative w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-10"
    >
      <div className="text-3xl font-bold mt-16 w-full flex items-center justify-center">
        Connect With Me
      </div>
      <p className="text-xl px-8 text-center">
        Interested in collaborating on a project or have an idea in mind? Drop a
        message below, and let&apos;s create something amazing together!
      </p>

      {status && !success && (
        <p className="text-yellow-600 text-center mb-4">{status}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full mx-10 sm:mx-0"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Your Name"
            {...register("Name", { required: "Name is required" })}
            className="w-full px-4 py-2 bg-white/5  border-2 border-green-500 dark:border-blue-500 shadow-lg rounded-full focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            {...register("Email", { required: "Email is required" })}
            className="w-full px-4 py-2 bg-white/5  border-2 border-green-500 dark:border-blue-500 shadow-lg rounded-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Phone Number"
            {...register("Phone")}
            className="w-full px-4 py-2 bg-white/5 dark:border-blue-500 border-2 border-green-500 shadow-lg rounded-full focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address"
            {...register("Address")}
            className="w-full px-4 py-2 bg-white/5 dark:border-blue-500 border-2 border-green-500 shadow-lg rounded-full focus:outline-none"
          />
        </div>

        <textarea
          rows={7}
          placeholder="Your message"
          {...register("Message", { required: "Message is required" })}
          className="w-full px-4 py-2 bg-white/5 dark:border-blue-500 border-2 border-green-500 shadow-lg rounded-3xl focus:outline-none"
        />

        <div className="text-red-500 text-sm">
          {errors.Name?.message ||
            errors.Email?.message ||
            errors.Message?.message}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-lightSky/5 transition-all duration-300 cursor-pointer ease-in-out scale-100 hover:scale-110 border-2 border-green-500 dark:border-blue-500 shadow-lg rounded-full"
        >
          {loading ? "Submitting message..." : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
