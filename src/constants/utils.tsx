import React from "react";
import { NavType, IconType } from "./types";
import { FaGithub, FaLinkedinIn, FaUpwork } from "react-icons/fa6";

interface NavItemProps extends NavType {
  section: IconType;
  isMobile?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  section,
  onClick,
  showIcons = false,
  activeSection,
  setActiveSection,
  isMobile = false, // Default to false
}) => {
  const IconComponent = section.icon;

  const handleItemClick = () => {
    if (onClick) {
      onClick();
    }
    setActiveSection(section.title.toLowerCase());
  };

  return (
    <li
      key={`link-${section.title}`}
      className={`nav-item flex ${isMobile ? "mobile" : ""} ${
        activeSection === section.title.toLowerCase() ? "active" : ""
      }`}
    >
      {isMobile && showIcons && <IconComponent className="nav-icon" />}
      <a
        href={`#${section.title}`}
        className={`nav-link ${
          activeSection === section.title.toLowerCase() ? "active" : ""
        }`}
        onClick={handleItemClick}
      >
        {section.title}
      </a>
    </li>
  );
};

interface NavItemsProps extends NavType {
  sections: IconType[];
  isMobile?: boolean; // New prop for mobile layout
}

export const NavItems: React.FC<NavItemsProps> = ({
  sections,
  activeSection,
  setActiveSection,
  onClick,
  showIcons = false,
  isMobile = false, // Default to false
}) => {
  return (
    <ul className={`nav-list ${isMobile ? "mobile" : ""}`}>
      {sections.map((section) => (
        <NavItem
          key={`link-${section.title}`}
          section={section}
          onClick={onClick}
          showIcons={showIcons}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isMobile={isMobile}
        />
      ))}
    </ul>
  );
};

export const Socials: IconType[] = [
  {
    title: "linkedin",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/dq-heard/",
  },
  { title: "github", icon: FaGithub, url: "https://www.github.com/dq-heard" },
  {
    title: "upwork",
    icon: FaUpwork,
    url: "https://www.upwork.com/freelancers/~01756fe10487af94c8",
  },
];
