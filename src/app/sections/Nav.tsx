import { useState, useEffect } from "react";
import type { IconType } from "react-icons";
import {
  BsGearFill,
  BsPersonFill,
  BsBriefcaseFill,
  BsFolderFill,
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
  { id: "skills", label: "Skills", Icon: BsGearFill },
  { id: "about", label: "About", Icon: BsPersonFill },
  { id: "projects", label: "Projects", Icon: BsFolderFill },
  { id: "experience", label: "Experience", Icon: BsBriefcaseFill },
  { id: "education", label: "Education", Icon: BsMortarboardFill },
  { id: "contact", label: "Contact", Icon: BsChatDotsFill },
];

const Nav: React.FC<NavProps & { onLinkClick?: () => void }> = ({
  isMobileActive,
  onLinkClick,
}) => {
  const [current, setCurrent] = useState<string>("skills");

  useEffect(() => {
    const sections = ITEMS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    const offset = window.innerWidth <= 768 ? 40 : 100;
    const trigger = offset + 20;

    let ticking = false;

    const updateCurrent = () => {
      let active = sections[0]?.id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= trigger) {
          active = section.id;
        } else {
          break;
        }
      }

      if (active) {
        setCurrent((prev) => (prev === active ? prev : active));
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateCurrent);
        ticking = true;
      }
    };

    updateCurrent();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCurrent);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateCurrent);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const getScrollOffset = () => {
        return window.innerWidth <= 768 ? 40 : 100;
      };
      window.scrollTo({
        top: section.offsetTop - getScrollOffset(),
        behavior: "smooth",
      });
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
