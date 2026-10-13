import { useRef, useState } from "react";
import { Exp, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { BsBriefcaseFill, BsChevronDown } from "react-icons/bs";
import { stencil, heading } from "../utils/fonts";
import "./styles/experience.css";

const INITIAL_COUNT = 3;

const Experience = ({ data, onContentLoaded }: SectionProps<Exp[]>) => {
  useSectionReady(onContentLoaded);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [showMore, setShowMore] = useState(false);
  const [openId, setOpenId] = useState<string | null>(
    data && data.length > 0 ? data[0]._id : null
  );

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
          {visibleData.map((item) => {
            const isOpen = openId === item._id;
            const headerId = `accordion-header-${item._id}`;
            const bodyId = `accordion-body-${item._id}`;

            return (
              <div key={item._id} className="timeline-item">
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-date font-mono">{item.period}</div>

                <article className="timeline-content glass-inner-card accordion-card">
                  {/* Accessible Accordion Header Trigger */}
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
                    <div
                      className={`accordion-indicator ${isOpen ? "open" : ""}`}
                      aria-hidden="true"
                    >
                      <BsChevronDown className="chevron-icon" />
                    </div>
                  </button>

                  {/* Smooth Framer Motion Body with ARIA Linking */}
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
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
              </div>
            );
          })}
        </div>

        {/* Left-Aligned Show More / Less Button */}
        {hasMoreItems && (
          <motion.button
            aria-expanded={showMore}
            aria-label={
              showMore ? "Collapse experience list" : "Expand experience list"
            }
            className="glass-button button-surface timeline-toggle-btn"
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
