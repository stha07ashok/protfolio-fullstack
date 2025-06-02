"use client";
import useGetActive from "@/utils/useGetActive";

interface Prpos {
  className?: string;
  title: string;
  subtitle: string;
}
const Logo = ({ title, subtitle }: Prpos) => {
  const { scrollToSection } = useGetActive();
  return (
    <div className="text-2xl group">
      <button onClick={() => scrollToSection("home")}>
        <h2 className="font-light hover:text-hoverColor  hoverEffect pl-5">
          {title}
          <span className="text-lightSky group-hover:text-green-500 hoverEffect dark:group-hover:text-white dark:text-violet-900">
            {subtitle}
          </span>
        </h2>
      </button>
    </div>
  );
};

export default Logo;
