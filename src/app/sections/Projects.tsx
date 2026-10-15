// Projects.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { optimizedImageUrl } from "@/sanity/lib/image";
import { Work, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks";

import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCode,
} from "react-icons/fa6";
import { BsFolderFill } from "react-icons/bs";
import { stencil, heading } from "../utils/fonts";
import "./styles/projects.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EmailPreview } from "./EmailPreview";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Web Admin", value: "web-admin" },
  { label: "Front End", value: "front-end" },
  { label: "E-mail Dev", value: "email-dev" },
];

const Projects = ({ data, onContentLoaded }: SectionProps<Work[]>) => {
  useSectionReady(onContentLoaded);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Active filter state - defaults to 'web-admin' on mobile (<768px), otherwise 'all'
  const [activeCategory, setActiveCategory] = useState<string>("web-admin");

  // State for triggering full-page Email Preview Modal
  const [activeEmailProject, setActiveEmailProject] = useState<Work | null>(
    null
  );

  useEffect(() => {
    // Set default category to 'all' when loading on desktop
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setActiveCategory("all");
    }
  }, []);

  const CATEGORY_PRIORITY: Record<string, number> = {
    "web-admin": 1,
    "front-end": 2,
    "email-dev": 3,
  };

  const filteredProjects = (
    activeCategory === "all"
      ? data
      : data?.filter((project) => project.category === activeCategory)
  )
    ?.slice()
    .sort((a, b) => {
      // Primary: Sort by Category Priority (Ascending: Web Admin -> Front End -> E-mail Dev)
      const priorityA = CATEGORY_PRIORITY[a.category] ?? 99;
      const priorityB = CATEGORY_PRIORITY[b.category] ?? 99;
      if (priorityA !== priorityB) return priorityA - priorityB;

      // Secondary: Sort Display Order in DESCENDING order (4, 3, 2, 1)
      return (b.order ?? 0) - (a.order ?? 0);
    });

  const isCarouselActive = filteredProjects && filteredProjects.length >= 3;

  useEffect(() => {
    if (swiperRef.current && isCarouselActive) {
      swiperRef.current.navigation.update();
    }
  }, [filteredProjects, isCarouselActive]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      className="section-card"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className={`${stencil.className} section-title`}
      >
        <BsFolderFill aria-hidden="true" focusable="false" />
        Projects
      </h2>

      {/* Category Filter Bar */}
      <div className="category-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`glass-button button-surface category-btn ${
              cat.value === "all" ? "desktop-only-filter" : ""
            } ${activeCategory === cat.value ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Carousel Specific Elements (Only rendered when carousel is active) */}
      {isCarouselActive && (
        <>
          <p className="sr-only mobile-swipe">
            Swipe left or right to explore projects
          </p>
          <button className="swiper-btn prev" aria-label="Previous project">
            <FaArrowLeft aria-hidden="true" focusable="false" />
          </button>
          <button className="swiper-btn next" aria-label="Next project">
            <FaArrowRight aria-hidden="true" focusable="false" />
          </button>
        </>
      )}

      {/* Conditional Rendering: Carousel for >= 3 projects, Grid for < 3 */}
      {isCarouselActive ? (
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination]}
          loop={true}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="section-content"
          aria-label="Project showcase carousel"
          role="region"
          key={filteredProjects.length}
        >
          {filteredProjects.map((project, index) => (
            <SwiperSlide
              className="glass-inner-card card"
              key={project._id || index}
            >
              <ProjectCardContent
                project={project}
                onOpenEmailModal={() => setActiveEmailProject(project)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="section-content static-project-grid">
          {filteredProjects?.map((project, index) => (
            <div className="glass-inner-card card" key={project._id || index}>
              <ProjectCardContent
                project={project}
                onOpenEmailModal={() => setActiveEmailProject(project)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Root-Level Modal Overlay (Escapes Card Container Boundaries) */}
      {activeEmailProject && (
        <EmailPreview
          isOpen={!!activeEmailProject}
          onClose={() => setActiveEmailProject(null)}
          projectTitle={activeEmailProject.title}
          folderSlug={activeEmailProject.slug?.current}
          templates={activeEmailProject.emailTemplates}
        />
      )}
    </section>
  );
};

// Reusable Inner Card Component
const ProjectCardContent = ({
  project,
  onOpenEmailModal,
}: {
  project: Work;
  onOpenEmailModal: () => void;
}) => {
  const handleDemoClick = (e: React.MouseEvent) => {
    if (project.category === "email-dev" && project.emailTemplates?.length) {
      e.preventDefault();
      onOpenEmailModal();
    }
  };

  return (
    <>
      <div className="card-image">
        <Image
          src={optimizedImageUrl(project.imgUrl, 700)}
          alt={`Screenshot of ${project.title} website`}
          width={700}
          height={525}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className={`${heading.className} card-title`}>{project.title}</h3>
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
              className="glass-button button-surface"
            >
              <FaCode aria-hidden="true" focusable="false" />
              View Code
            </a>
          )}
          <a
            href={project.demo || "#"}
            onClick={handleDemoClick}
            target={project.category === "email-dev" ? "_self" : "_blank"}
            rel="noreferrer"
            className="glass-button button-surface"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" focusable="false" />
            Live Site
          </a>
        </div>
      </div>
    </>
  );
};

export default Projects;
