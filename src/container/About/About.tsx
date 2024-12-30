import React, { useEffect, useState } from "react";
import { Bio } from "./Bio";
import { Skills } from "./Skills";
import { client } from "../../client";
import "./About.scss";

export interface About {
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
}

export interface Skill {
  _id: string;
  _type: string;
  name: string;
  icon: string;
  category: string;
}

interface AboutProps {
  onContentLoaded: () => void;
}

export const About: React.FC<AboutProps> = ({ onContentLoaded }) => {
  const [bioData, setBioData] = useState<About[]>([]);
  const [skillsData, setSkillsData] = useState<Skill[]>([]);

  useEffect(() => {
    const query = `{ "about": *[_type == "about"], "skills": *[_type == "skills"] | order(_createdAt asc) }`;
    client
      .fetch(query)
      .then((fetchedData: { about: About[]; skills: Skill[] }) => {
        setBioData(fetchedData.about);
        setSkillsData(fetchedData.skills);
        onContentLoaded(); // Call the callback here
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [onContentLoaded]);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow fadeInUp">About Me & My Skills</h2>
        </div>

        <Bio data={bioData} />
      </div>
      <Skills data={skillsData} />
    </section>
  );
};
