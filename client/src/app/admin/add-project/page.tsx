"use client"; // only if you're using the app directory

import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

type Tech = {
  name: string;
};

type ProjectFormValues = {
  title: string;
  category: string;
  description: string;
  stack: Tech[];
  image: FileList;
  liveUrl: string;
  githubUrl: string;
};

const AddProject: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      stack: [{ name: "" }],
      liveUrl: "",
      githubUrl: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stack",
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("liveUrl", data.liveUrl);
    formData.append("githubUrl", data.githubUrl);
    formData.append("image", data.image[0]); 

    data.stack.forEach((tech, index) => {
      formData.append(`stack[${index}].name`, tech.name);
    });

    // Send formData to your backend (e.g., via fetch or axios)
    console.log("Form submitted", data);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Project</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 border-2 border-green-500 dark:border-blue-500  rounded-lg shadow-lg space-y-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Stack */}
        <div>
          <label className="block font-medium mb-2">Tech Stack</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`stack.${index}.name`, {
                  required: "Technology is required",
                })}
                className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
              />
              <button
                type="button"
                className="text-red-500"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-green-500 dark:text-blue-500 hover:underline mt-2"
            onClick={() => append({ name: "" })}
          >
            + Add Technology
          </button>
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Project Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Live URL */}
        <div>
          <label className="block font-medium mb-1">Live URL</label>
          <input
            {...register("liveUrl")}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
            placeholder="https://example.com"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block font-medium mb-1">GitHub URL</label>
          <input
            {...register("githubUrl")}
            className="w-full border-2 border-green-500 dark:border-blue-500 shadow-lg bg-white/5 focus:outline-none rounded-md p-2"
            placeholder="https://github.com/your-repo"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 dark:bg-blue-500 py-2 rounded-md hover:bg-green-700 dark:hover:bg-blue-700 transition-all duration-300 cursor-pointer ease-in-out scale-100 hover:scale-105"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
