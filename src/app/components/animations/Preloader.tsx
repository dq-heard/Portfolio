import { oswald } from "@/app/utils/fonts";

import "./preloader.css";

const Preloader = () => {
  return (
    <div className="loading" role="status" aria-label="Loading content">
      <div className={`loading-text ${oswald.className}`}>
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
