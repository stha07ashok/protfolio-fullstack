"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function AnimatedSquares() {
  const { theme } = useTheme();
  const [squareCount, setSquareCount] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setSquareCount(30);
      } else {
        setSquareCount(50);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const borderColor =
    theme === "dark" ? "rgb(255 255 255 / 0.7)" : "rgb(34, 197, 94)";

  const squares = Array.from({ length: squareCount }, (_, i) => ({
    id: i,
    size: getRandom(3, 60),
    left: getRandom(0, 100),
    delay: getRandom(0, 10),
    duration: getRandom(3, 25),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {squares.map(({ id, size, left, delay, duration }) => (
        <div
          key={id}
          className="absolute"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            border: `1px solid ${borderColor}`,
            animation: `floatUp ${duration}s linear ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
