import React, { useState, useEffect, useRef, MouseEvent } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowUpRightFromSquare,
  FaCode,
} from "react-icons/fa6";
import { motion } from "framer-motion";

import { urlFor, client } from "../../client";
import { Services } from "./Services";
import "./Work.scss";

interface Project {
  _id: string;
  _type: string;
  title: string;
  description: string;
  demoLink: string;
  codeLink: string;
  imgUrl: string;
  technologies: string[];
  _updatedAt: string;
}

export const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const carouselRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const query = '*[_type == "projects"] | order(_updatedAt desc)';
    client.fetch<Project[]>(query).then((data) => {
      setProjects(data);
    });
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 3;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollToCard = (direction: "left" | "right") => {
    const card = carouselRef.current!.querySelector(
      ".project-card"
    ) as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    if (direction === "left") {
      carouselRef.current!.scrollLeft -= cardWidth;
    } else {
      carouselRef.current!.scrollLeft += cardWidth;
    }
  };

  return (
    <section className="work" id="work">
      <div className="section-header text-center">
        <h2 className="section-title wow fadeInUp">Services & Projects</h2>
      </div>

      <Services />

      <div className="wrapper">
        <div
          className="btn-container left"
          onClick={() => scrollToCard("left")}
        >
          <FaAngleLeft />
        </div>
        <ul
          className="carousel"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {projects.map((project, index) => (
            <li className="project-card" key={index}>
              <div className="img-container">
                <img
                  className="project-img"
                  src={urlFor(project.imgUrl)}
                  alt={project.title}
                />
                <motion.div
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="project-links flex"
                >
                  <a href={project.demoLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="flex"
                    >
                      <FaArrowUpRightFromSquare />
                    </motion.div>
                  </a>
                  <a href={project.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="flex"
                    >
                      <FaCode />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
              <ul className="project-skills">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="project-tech">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="project-text flex">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div
          className="btn-container right"
          onClick={() => scrollToCard("right")}
        >
          <FaAngleRight />
        </div>
      </div>
    </section>
  );
};
