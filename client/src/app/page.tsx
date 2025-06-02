"use client";
import AboutMe from "@/components/userComponents/aboutMe";
import Contact from "@/components/userComponents/contact";
import Hero from "@/components/userComponents/hero";
import Projects from "@/components/userComponents/projects";
import Services from "@/components/userComponents/services";
import AnimatedSquares from "@/utils/AnimatedSquares";
import Dots from "@/utils/dots";
import ScrollLine from "@/utils/scrollLine";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedSquares />

      <div className="hidden xl:flex fixed border-2 shadow-lg rounded-3xl border-green-500 dark:border-white left-8 top-1/2 -translate-y-1/2 z-50">
        <Dots />
      </div>
      <div className="hidden xl:flex fixed  border-2 shadow-lg rounded-3xl border-green-500 dark:border-white right-8 top-1/2 -translate-y-1/2 z-50">
        <Dots />
      </div>

      <div className="relative z-10 min-h-screen w-full sm:p-20">
        <main className="flex flex-col gap-16">
          <Hero />
          <ScrollLine />
          <AboutMe />
          <ScrollLine />
          <Projects />
          <ScrollLine />
          <Services />
          <ScrollLine />
          <Contact />
        </main>
      </div>
    </div>
  );
}
