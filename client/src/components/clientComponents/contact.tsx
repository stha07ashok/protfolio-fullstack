"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useScroll, useTransform, motion } from "framer-motion";
import Success from "./success";
import AnimatedSquares from "@/utils/AnimatedSquares";

type FormData = {
  Name: string;
  Email: string;
  Phone?: string;
  Address?: string;
  Message: string;
  Service?: string;
};

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("");
    setLoading(true);

    try {
      const form = new FormData();
      const currentDataTime = new Date().toLocaleString();

      form.append("Name", data.Name);
      form.append("Email", data.Email);
      form.append("Phone", data.Phone || "");
      form.append("Address", data.Address || "");
      form.append("Message", data.Message);
      form.append("Services", data.Service || "");
      form.append("DateTime", currentDataTime);

      const response = await fetch("https://getform.io/f/ayvvdvjb", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
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

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0.9 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 4], [0.9555, 1.21]);
  const opacityProgress = useTransform(scrollYProgress, [0, 2], [0, 2]);

  return (
    <motion.div
      id="contact"
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="relative w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-10"
    >
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0">
        <AnimatedSquares />
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="text-3xl font-bold mt-16 w-full flex items-center justify-center">
          Connect With Me
        </div>
        <p className="text-xl px-64 hidden md:block text-center">
          Interested in collaborating on a project or have an idea in mind? Drop
          a message below, and let&apos;s create something amazing together!
        </p>
      </div>

      <div className="relative z-10 w-full">
        {status && !success && <p className="text-yellow-500">{status}</p>}
        {success ? (
          <Success status={status} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-10 sm:mx-44"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Your Name"
                {...register("Name", { required: "Name is required" })}
                className="w-full px-4 py-2 bg-white/5  placeholder:text-dark dark:placeholder:text-white border-2 border-green-500 dark:border-white shadow-lg rounded-full"
              />
              <input
                type="email"
                placeholder="Email Address"
                {...register("Email", { required: "Email is required" })}
                className="w-full px-4 py-2 bg-white/5  placeholder:text-dark dark:placeholder:text-white border-2 border-green-500 dark:border-white shadow-lg rounded-full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Phone Number"
                {...register("Phone")}
                className="w-full px-4 py-2 bg-white/5  placeholder:text-dark dark:placeholder:text-white border-2 border-green-500 dark:border-white shadow-lg rounded-full"
              />
              <input
                type="text"
                placeholder="Address"
                {...register("Address")}
                className="w-full px-4 py-2 bg-white/5 placeholder:text-dark dark:placeholder:text-white border-2 border-green-500 dark:border-white shadow-lg rounded-full"
              />
            </div>

            <textarea
              rows={7}
              placeholder="Text Here"
              {...register("Message", { required: "Message is required" })}
              className="w-full px-4 py-2 bg-white/5 placeholder:text-dark dark:placeholder:text-white border-2 border-green-500 dark:border-white shadow-lg rounded-3xl"
            />

            <div className="text-red-500 text-sm">
              {errors.Name?.message ||
                errors.Email?.message ||
                errors.Message?.message}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-lightSky/5 transition-all duration-300 cursor-pointer ease-in-out scale-100 hover:scale-110 border-2 border-green-500 dark:border-white shadow-lg rounded-full"
            >
              {loading ? "Submitting message..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;
