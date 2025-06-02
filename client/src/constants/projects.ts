import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
  SiExpress,
  SiNextdotjs,
} from "react-icons/si";
import bloodDontation from "@/images/bloodDonation.png";
import bookstore from "@/images/bookstore.png";
import simpleecommerce from "@/images/simple-ecommerce.png";
import appointment from "@/images/appointment.png";
import carshowcase from "@/images/car.png";

export const projectsData = [
  {
    title: "The Book Hub System",
    category: "Full Stack Development",
    description:
      "A modern e-commerce platform built with Next.js to provide a seamless shopping experience of new and pre-owned books to customers. User can aslo sell their used books on this platform.",
    stack: [
      { name: "React.js", icon: FaReact },
      {
        name: "Tailwind Css",
        icon: SiTailwindcss,
      },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
    ],
    image: bookstore,
    liveUrl: "/",
    githubUrl: "https://github.com/stha07ashok/BookStore",
  },
  {
    title: "The Appointment System",
    category: "Full Stack Development",
    description:
      "The Appointment System is a full stack application built with React.js, MongoDb and Express.js. It allows user to book an appointment with the doctor and also allows admin to manage the appointments and doctors. User can also send message to the admin using message option.",
    stack: [
      { name: "React.js", icon: FaReact },
      {
        name: "Tailwind Css",
        icon: SiTailwindcss,
      },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
    ],
    image: appointment,
    liveUrl: "/",
    githubUrl: "https://github.com/stha07ashok/Appointment-Project",
  },
  {
    title: "Simple E-commerce",
    category: "Full Stack Development",
    description:
      "A simple interactive e-commerce platform built with React.js, Node.js, Express.js and MongoDb which user can simple add, remove and edit the products. This project is built to understand the basic concept of e-commerce platform and how full stack application is built",
    stack: [
      { name: "React.js", icon: FaReact },
      {
        name: "Tailwind Css",
        icon: SiTailwindcss,
      },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
    ],
    image: simpleecommerce,
    liveUrl: "https://mern-simple-e-commerce-project.onrender.com/",
    githubUrl: "https://github.com/stha07ashok/MERN-simple-E-commerce-project",
  },
  {
    title: "Car Showcase",
    category: "Frontend Development",
    description:
      "A sleek and responsive web application that allows users to explore and showcase a variety of cars. The platform features a dynamic search functionality, user-friendly design, and efficient database integration to manage car details.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      {
        name: "Tailwind Css",
        icon: SiTailwindcss,
      },
      { name: "Typescript", icon: SiTypescript },
    ],
    image: carshowcase,
    liveUrl:
      "https://nextjs-car-showcase-git-main-ashok-shresthas-projects-d61f8c93.vercel.app/",
    githubUrl: "https://github.com/stha07ashok/Nextjs_Car_Showcase",
  },
  {
    title: "Blood Donation Platform",
    category: "Frontend Development",
    description:
      "A web application designed to connect blood donors with recipients in need. Users can register as donors, search for available donors by blood type and location, and request or offer blood donations. The platform includes admin features for managing users and donation requests.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind Css", icon: SiTailwindcss },
      { name: "Typescript", icon: SiTypescript },
    ],
    image: bloodDontation,

    liveUrl:
      "blood-donation-nex-git-d87029-ashok-shresthas-projects-d61f8c93.vercel.app",
    githubUrl: "https://github.com/stha07ashok/Blood-Donation-nextjs",
  },
];
