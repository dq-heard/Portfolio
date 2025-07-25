import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

import "./topscroller.css";

const TopScroller = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-toggle glass-button ${showScroll ? "show-scroll" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="scroll-icon" aria-hidden="true" focusable="false" />
    </button>
  );
};

export default TopScroller;
