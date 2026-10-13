import { useRef, useState, useEffect } from "react";
import { Exp, SectionProps } from "../utils/types";
import { useSectionReady } from "../hooks";
import { AnimatePresence, motion, Transition } from "framer-motion";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { BsBriefcaseFill, BsChevronDown } from "react-icons/bs";
import { stencil, heading } from "../utils/fonts";
import "./styles/experience.css";

const INITIAL_COUNT = 3;
const MOBILE_BREAKPOINT = 600; // Adjust threshold if needed (e.g., 600 or 768)

// Tight, non-bouncy spring for list items
const itemTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.8,
};

// Fast, snappy ease for internal accordion drop
const accordionEase = [0.16, 1, 0.3, 1] as const;

const Experience = ({ data, onContentLoaded }: SectionProps<Exp[]>) => {
  useSectionReady(onContentLoaded);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [showMore, setShowMore] = useState(false);

  // Initialize openId: open first item on desktop, close all on mobile screens (< 600px)
  const [openId, setOpenId] = useState<string | null>(() => {
    if (!data || data.length === 0) return null;
    if (
      typeof window !== "undefined" &&
      window.innerWidth < MOBILE_BREAKPOINT
    ) {
      return null;
    }
    return data[0]._id;
  });

  if (!data) return null;

  const visibleData = showMore ? data : data.slice(0, INITIAL_COUNT);
  const hasMoreItems = data.length > INITIAL_COUNT;

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      className="section-card"
      aria-labelledby="work-heading"
    >
      <h2 id="work-heading" className={`${stencil.className} section-title`}>
        <BsBriefcaseFill aria-hidden="true" focusable="false" />
        Professional Experience
      </h2>

      <div className="section-content">
        <div className="timeline">
          <AnimatePresence initial={false}>
            {visibleData.map((item) => {
              const isOpen = openId === item._id;
              const headerId = `accordion-header-${item._id}`;
              const bodyId = `accordion-body-${item._id}`;

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={itemTransition}
                  className="timeline-item"
                >
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-date font-mono">{item.period}</div>

                  <article className="timeline-content glass-inner-card accordion-card">
                    {/* Header Trigger */}
                    <button
                      type="button"
                      id={headerId}
                      className="timeline-header accordion-summary"
                      onClick={() => toggleAccordion(item._id)}
                      aria-expanded={isOpen}
                      aria-controls={bodyId}
                    >
                      <div className="header-info">
                        <h3 className={`${heading.className} timeline-role`}>
                          {item.role}
                        </h3>
                        <p className="timeline-company">{item.company}</p>
                      </div>
                      <motion.div
                        className={`accordion-indicator ${isOpen ? "open" : ""}`}
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <BsChevronDown className="chevron-icon" />
                      </motion.div>
                    </button>

                    {/* Accordion Body Height Drop */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={bodyId}
                          role="region"
                          aria-labelledby={headerId}
                          className="accordion-body-wrapper"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: accordionEase }}
                        >
                          <div className="accordion-body">
                            <p className="timeline-summary">{item.summary}</p>

                            {item.highlights && item.highlights.length > 0 && (
                              <ul className="timeline-highlights">
                                {item.highlights.map((highlight, idx) => (
                                  <li key={idx}>{highlight}</li>
                                ))}
                              </ul>
                            )}

                            {item.keyDeliverable && (
                              <div className="key-deliverable-note">
                                <strong>Key Deliverable:</strong>{" "}
                                {item.keyDeliverable}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Button */}
        {hasMoreItems && (
          <motion.button
            aria-expanded={showMore}
            aria-label={
              showMore ? "Collapse experience list" : "Expand experience list"
            }
            className="glass-button button-surface timeline-toggle-btn"
            onClick={() => setShowMore((prev) => !prev)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
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
