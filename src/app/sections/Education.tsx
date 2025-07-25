import { Cert, Edu, SectionProps, Topics } from "../utils/types";
import { useSectionReady } from "../hooks/useSectionReady";

import { BsAwardFill, BsMortarboardFill } from "react-icons/bs";
import { bigShoulders, oswald } from "../utils/fonts";
import "./styles/education.css";

const Education = ({ data, onContentLoaded }: SectionProps<Edu[]>) => {
  useSectionReady(onContentLoaded);

  if (!data || data.length === 0) return null;

  return (
    <section className="section-card" aria-labelledby="education-heading">
      <h2
        id="education-heading"
        className={`${bigShoulders.className} section-title`}
      >
        <BsMortarboardFill aria-hidden="true" focusable="false" /> Education
      </h2>
      <div className="section-content">
        <div className="education-grid">
          {data.map((edu: Edu, i: number) => {
            const focusTags = edu.certs.flatMap((cert: Cert) =>
              cert.focus.map((f: Topics) => f.topics).filter(Boolean)
            );

            return (
              <div
                key={`${edu.name}-${i}`}
                className="education-card glass-inner-card"
              >
                <div className="education-icon">
                  <BsAwardFill aria-hidden="true" focusable="false" />
                </div>
                <div className="education-details">
                  <h3 className={oswald.className}>{edu.name}</h3>
                  {edu.certs.map((cert: Cert, j: number) => (
                    <div key={`${cert.course}-${j}`}>
                      <h4 className={oswald.className}>{cert.issuer}</h4>
                      <p className="education-degree">{cert.course}</p>
                    </div>
                  ))}

                  {focusTags.length > 0 && (
                    <div className="skill-tags">
                      {focusTags.map((tag: string, k: number) => (
                        <span className="skill-tag" key={`${tag}-${k}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
