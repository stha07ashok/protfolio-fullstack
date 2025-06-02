import { useEffect, useState } from "react";

export function useTypeWriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0; // Character index
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i + 1)); // Use slice for precise text updating
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [text, speed]);

  return { displayText, isComplete };
}
