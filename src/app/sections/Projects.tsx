import { useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import { Work, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks/useSectionReady";

import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCode,
} from "react-icons/fa6";
import { BsFolderFill } from "react-icons/bs";
import { bigShoulders, oswald } from "../utils/fonts";
import "./styles/projects.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Projects = ({ data, onContentLoaded }: SectionProps<Work[]>) => {
  useSectionReady(onContentLoaded);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current && data.length >= 3) {
      swiperRef.current.navigation.update();
    }
  }, [data]);

  if (!data) return null;

  return (
    <section className="section-card" aria-labelledby="projects-heading">
      <h2
        id="projects-heading"
        className={`${bigShoulders.className} section-title`}
      >
        <BsFolderFill aria-hidden="true" focusable="false" />
        Projects
      </h2>
      <button className="swiper-btn prev" aria-label="Previous project">
        <FaArrowLeft aria-hidden="true" focusable="false" />
      </button>
      <button className="swiper-btn next" aria-label="Next project">
        <FaArrowRight aria-hidden="true" focusable="false" />
      </button>
      {data.length >= 3 && (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          loop={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="section-content"
          aria-label="Project showcase carousel"
          role="region"
          key={data.length}
        >
          {data.map((project, index) => (
            <SwiperSlide className="glass-inner-card card" key={index}>
              <div className="card-image">
                <img
                  src={urlFor(project.imgUrl).url()}
                  alt={`Screenshot of ${project.title} website`}
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h3 className={`${oswald.className} card-title`}>
                  {project.title}
                </h3>
                <p className="card-text">{project.desc}</p>
                <ul className="badges">
                  {project.tech.map((tech, index) => (
                    <li key={index} className="badge">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="card-footer">
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-button"
                    >
                      <FaCode aria-hidden="true" focusable="false" />
                      View Code
                    </a>
                  )}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-button"
                  >
                    <FaArrowUpRightFromSquare
                      aria-hidden="true"
                      focusable="false"
                    />
                    Live Site
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Projects;
