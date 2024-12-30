import { useEffect, useState } from "react";

import { About } from "./About";
import CodeBlock from "../../graphics/CodeBlock";
import Cube from "../../graphics/Cube";
import Grid from "../../graphics/Grid";

import "./About.scss";

interface BioProps {
  data: About[];
}

export const Bio: React.FC<BioProps> = ({ data }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const delay =
      (19 + 25 + 20 + 20 + 25 + 15 + 17 + 17 + 18 + 5 + 2) * 150 + 3000;

    const intervalID = setInterval(() => {
      setKey((prevKey) => prevKey + 1); // Increment the key to remount CodeBlock
    }, delay + 1000); // Adjust timing as necessary

    return () => clearInterval(intervalID); // Clean up on unmount
  }, []);

  return (
    <div className="grid">
      <div className="box my-craft">
        <div className="spotlight"></div>
        {data.map((item, index) => (
          <div className="cluster" key={index}>
            <h2 className="section-subtitle">{item.title1}</h2>
            <p className="description">{item.desc1}</p>
          </div>
        ))}
        <Cube />
      </div>
      <div className="box my-drive">
        <div className="flex row cluster">
          <div className="code-block">
            <div className="dot-container">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <pre
              style={{
                display: "block",
                overflowX: "auto",
                background: "var(--body-color)",
                color: "var(--first-color)",
                padding: "20px",
              }}
            >
              <CodeBlock key={key} />
            </pre>
          </div>
          {data.map((item, index) => (
            <div className="text" key={index}>
              <h2 className="section-subtitle">{item.title2}</h2>
              <p className="description">{item.desc2}</p>
            </div>
          ))}
        </div>
        <Grid />
      </div>
    </div>
  );
};

export default Bio;
