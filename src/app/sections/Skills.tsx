import React, { ReactElement, useMemo, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import { Skill, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks/useSectionReady";

import {
  BsDatabaseFill,
  BsGearFill,
  BsImageFill,
  BsPieChartFill,
} from "react-icons/bs";

import { bigShoulders, oswald } from "../utils/fonts";
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
      backend: (
        <BsDatabaseFill
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
      // add more icons as needed
    };

    const categoryTitles: Record<string, string> = {
      frontend: "Front End",
      backend: "Back End",
      datatools: "Data Tools",
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

  const groupedSkills = useMemo(() => getGroupedSkills(data), [data]);

  const SkillItem = React.memo(({ skill }: { skill: Skill }) => (
    <div className="skills-item skills-tag">
      <img
        src={urlFor(skill.icon).url()}
        alt={skill.name}
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
          <h3 className={`${oswald.className} skills-category`}>{title}</h3>
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
      <h2
        id="skills-heading"
        className={`${bigShoulders.className} section-title`}
      >
        <BsGearFill aria-hidden="true" focusable="false" /> Skills
      </h2>
      <div className="section-content skills-container">
        {Object.entries(groupedSkills).map(([title, { icon, skills }]) => (
          <SkillCard key={title} title={title} icon={icon} skills={skills} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
