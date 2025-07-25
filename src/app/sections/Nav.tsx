import { useState, useEffect } from "react";
import type { IconType } from "react-icons";
import {
  BsPersonFill,
  BsBriefcaseFill,
  BsFolderFill,
  BsGearFill,
  BsMortarboardFill,
  BsChatDotsFill,
} from "react-icons/bs";

import "./styles/nav.css";

type NavProps = {
  isMobileActive: boolean;
};

type NavItem = {
  id: string;
  label: string;
  Icon: IconType;
};

const ITEMS: NavItem[] = [
  { id: "about", label: "About", Icon: BsPersonFill },
  { id: "experience", label: "Experience", Icon: BsBriefcaseFill },
  { id: "projects", label: "Projects", Icon: BsFolderFill },
  { id: "skills", label: "Skills", Icon: BsGearFill },
  { id: "education", label: "Education", Icon: BsMortarboardFill },
  { id: "contact", label: "Contact", Icon: BsChatDotsFill },
];

const Nav: React.FC<NavProps & { onLinkClick?: () => void }> = ({
  isMobileActive,
  onLinkClick,
}) => {
  const [current, setCurrent] = useState<string>("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleEntry = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0.2
        );
        if (visibleEntry && visibleEntry.target.id !== current) {
          setCurrent(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [current]);

  const getScrollOffset = () => {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? 40 : 100;
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = getScrollOffset();
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: "smooth",
      });
      setCurrent(id);
    }
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav className={`glass-nav ${isMobileActive ? "mobile-active" : ""}`}>
      <ul>
        {ITEMS.map(({ id, label, Icon }) => (
          <li key={id}>
            <button
              aria-controls={id}
              aria-label={`Scroll to ${label}`}
              aria-current={current === id ? "true" : undefined}
              className={current === id ? "active" : ""}
              onClick={() => scrollToSection(id)}
            >
              <Icon className="nav-icon" aria-hidden="true" focusable="false" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
