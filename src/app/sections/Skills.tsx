import React, { ReactElement, useMemo } from "react";
import { urlFor } from "@/sanity/lib/image";
import { Skill, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks/useSectionReady";

import {
  BsGearFill,
  BsImageFill,
  BsLayersFill,
  BsPieChartFill,
  BsDatabaseFill,
  BsGlobeEuropeAfrica,
} from "react-icons/bs";

import { stencil, heading } from "../utils/fonts";
import "./styles/skills.css";

const Skills = ({ data, onContentLoaded }: SectionProps<Skill[]>) => {
  useSectionReady(onContentLoaded);

  const getGroupedSkills = (skills: Skill[]) => {
    const icons: Record<string, ReactElement> = {
      frontend: (
        <BsImageFill
          className="skills-icon"
          aria-hidden="true"
          focusable="false"
        />
      ),
      coreweb: (
        <BsGlobeEuropeAfrica
          className="skills-icon"
          aria-hidden="true"
          focusable="false"
        />
      ),
      platforms: (
        <BsLayersFill
          className="skills-icon"
          aria-hidden="true"
          focusable="false"
        />
      ),
      datatools: (
        <BsPieChartFill
          className="skills-icon"
          aria-hidden="true"
          focusable="false"
        />
      ),
      backend: (
        <BsDatabaseFill
          className="skills-icon"
          aria-hidden="true"
          focusable="false"
        />
      ),
      // add more icons as needed
    };

    const categoryTitles: Record<string, string> = {
      frontend: "Front End",
      coreweb: "Core Web",
      platforms: "Platforms",
      datatools: "Data Tools",
      backend: "Back End",
      // Add more as needed
    };

    return skills.reduce(
      (acc, skill) => {
        const key = skill.category;
        const title = categoryTitles[key] || key;

        if (!acc[title]) {
          acc[title] = {
            icon: icons[key] || <BsGearFill className="skills-icon" />,
            skills: [],
          };
        }

        acc[title].skills.push(skill);
        return acc;
      },
      {} as Record<string, { icon: ReactElement; skills: Skill[] }>
    );
  };

  const CATEGORY_ORDER = [
    "Front End",
    "Core Web",
    "Platforms",
    "Data Tools",
    "Back End",
  ];

  const groupedSkills = useMemo(() => getGroupedSkills(data), [data]);

  const SkillItem = React.memo(({ skill }: { skill: Skill }) => (
    <div className="skills-item skills-tag">
      <img
        src={urlFor(skill.icon).url()}
        alt={`${skill.name} logo`}
        className="skills-img"
        loading="lazy"
      />
      <span className="skills-title">{skill.name}</span>
    </div>
  ));

  const SkillCard = React.memo(
    ({
      title,
      icon,
      skills,
    }: {
      title: string;
      icon: ReactElement;
      skills: Skill[];
    }) => (
      <div className="glass-inner-card skills-content">
        <div className="skills-header">
          {icon}
          <h3 className={`${heading.className} skills-category`}>{title}</h3>
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <SkillItem key={skill._id} skill={skill} />
          ))}
        </div>
      </div>
    )
  );

  if (!data || data.length === 0) return null;

  return (
    <section className="section-card" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={`${stencil.className} section-title`}>
        <BsGearFill aria-hidden="true" focusable="false" /> Skills
      </h2>
      <div className="section-content skills-container">
        {Object.entries(groupedSkills)
          .sort(([a], [b]) => {
            const indexA = CATEGORY_ORDER.indexOf(a);
            const indexB = CATEGORY_ORDER.indexOf(b);

            // fallback: unknown categories go to the end
            return (
              (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
            );
          })
          .map(([title, { icon, skills }]) => (
            <SkillCard key={title} title={title} icon={icon} skills={skills} />
          ))}
      </div>
    </section>
  );
};

export default Skills;
