import { heading } from "@/app/utils/fonts";

import "./preloader.css";

type PreloaderProps = {
  exiting?: boolean;
};

const Preloader = ({ exiting = false }: PreloaderProps) => {
  return (
    <div
      className={`loading ${exiting ? "loading-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className={`loading-text ${heading.className}`}>
        <span className="loading-text-words">L</span>
        <span className="loading-text-words">O</span>
        <span className="loading-text-words">A</span>
        <span className="loading-text-words">D</span>
        <span className="loading-text-words">I</span>
        <span className="loading-text-words">N</span>
        <span className="loading-text-words">G</span>
      </div>
    </div>
  );
};

export default Preloader;
