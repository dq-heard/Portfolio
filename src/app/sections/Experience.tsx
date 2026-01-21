import { useState } from "react";
import { Exp, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks/useSectionReady";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";

import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { stencil, heading } from "../utils/fonts";
import "./styles/experience.css";

const Experience = ({ data, onContentLoaded }: SectionProps<Exp[]>) => {
  useSectionReady(onContentLoaded);

  const [showMore, setShowMore] = useState(false);
  const currentJobs = data.filter((exp) => !exp.endDate);
  const pastJobs = data.filter((exp) => exp.endDate);

  const formatDateRange = (start: Date, end: Date | null) => {
    const startFormatted = format(new Date(start), "yyyy");
    const endFormatted = end ? format(new Date(end), "yyyy") : "Present";
    return `${startFormatted} – ${endFormatted}`;
  };

  const ExperienceItem = ({ exp }: { exp: Exp }) => (
    <>
      <div className="timeline-date">
        {formatDateRange(exp.startDate, exp.endDate)}
      </div>
      <div className="timeline-content glass-inner-card">
        <h3 className={heading.className}>{exp.role}</h3>
        <h4 className={heading.className}>{`${exp.name} | ${exp.location}`}</h4>
        <ul>
          {exp.tasks.map((task, i) => (
            <li key={i}>·{task}</li>
          ))}
        </ul>
      </div>
    </>
  );

  if (!data) return null;

  return (
    <section id="experience-heading" className="section-card">
      <h2
        className={`${stencil.className} section-title`}
        aria-labelledby="experience-heading"
      >
        <BsBriefcaseFill aria-hidden="true" focusable="false" />
        Professional Experience
      </h2>
      <div className="section-content">
        <div className="timeline">
          {/* Current Experiences */}
          {currentJobs.map((exp, index) => (
            <div key={exp._id} className="timeline-item">
              <div className="timeline-dot"></div>
              <ExperienceItem exp={exp} />
            </div>
          ))}
          {/* Toggle-able Past Experiences */}
          <AnimatePresence>
            {showMore &&
              pastJobs.map((exp) => (
                <div key={exp._id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <motion.div
                    className="timeline-animated"
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExperienceItem exp={exp} />
                  </motion.div>
                </div>
              ))}
          </AnimatePresence>
        </div>
        {pastJobs.length > 0 && (
          <motion.button
            aria-expanded={showMore}
            aria-label={
              showMore ? "Collapse experience list" : "Expand experience list"
            }
            className="toggle-btn glass-button"
            onClick={() => setShowMore((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
          >
            {showMore ? (
              <>
                Show Less
                <FaArrowRotateLeft aria-hidden="true" focusable="false" />
              </>
            ) : (
              <>
                Show More
                <FaArrowRotateRight aria-hidden="true" focusable="false" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default Experience;
