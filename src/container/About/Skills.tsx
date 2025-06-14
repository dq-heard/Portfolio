import { FaChartPie, FaImages } from "react-icons/fa6";

import { urlFor } from "../../client";
import { Skill } from "./About";
import { Window } from "../../graphics/Window";
import "./About.scss";

interface SkillsProps {
  data: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
  const frontEndSkills = data.filter((skill) => skill.category === "frontend");
  // const backEndSkills = data.filter((skill) => skill.category === "backend");
  const dataToolSkills = data.filter((skill) => skill.category === "datatools");

  return (
    <div className="container skills-container">
      <div className="box skills-content">
        <div className="flex skills-header">
          <FaImages className="skills-icon" />
          <h3 className="skills-category">Front End</h3>
        </div>
        <div className="skills-list">
          {frontEndSkills.map((skill) => (
            <div className="skills-item" key={skill._id}>
              <img
                src={urlFor(skill.icon)}
                alt={skill.name}
                className="skills-img"
              />
              <p className="skills-title">{skill.name}</p>
            </div>
          ))}
        </div>
        <Window />
      </div>

      {/* <div className="box skills-content">
        <div className="flex skills-header">
          <FaCoins className="skills-icon" />
          <h3 className="skills-category">Back End</h3>
        </div>
        <div className="skills-list">
          {backEndSkills.map((skill) => (
            <div className="skills-item" key={skill._id}>
              <img
                src={urlFor(skill.icon)}
                alt={skill.name}
                className="skills-img"
              />
              <p className="skills-title">{skill.name}</p>
            </div>
          ))}
        </div>
        <Window />
      </div> */}

      <div className="box skills-content">
        <div className="flex skills-header">
          <FaChartPie className="skills-icon" />
          <h3 className="skills-category">Data Tools</h3>
        </div>
        <div className="skills-list">
          {dataToolSkills.map((skill) => (
            <div className="skills-item" key={skill._id}>
              <img
                src={urlFor(skill.icon)}
                alt={skill.name}
                className="skills-img"
              />
              <p className="skills-title">{skill.name}</p>
            </div>
          ))}
        </div>
        <Window />
      </div>
    </div>
  );
};
