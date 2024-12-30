import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

import "./BackToTop.css";

export const BackToTop = () => {
  const scrollUpRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 560) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="#home"
      className={`scroll-up ${showScroll ? "show-scroll" : ""}`}
      ref={scrollUpRef}
    >
      <FaArrowUp className="scroll-icon" />
    </a>
  );
};
