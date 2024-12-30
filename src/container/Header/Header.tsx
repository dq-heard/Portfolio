import { useState, useEffect } from "react";
import {
  FaAddressBook,
  FaBriefcase,
  FaCommentDots,
  FaHouse,
} from "react-icons/fa6";

import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";
import "./Header.scss";

export const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { title: "home", icon: FaHouse },
    { title: "about", icon: FaAddressBook },
    { title: "work", icon: FaBriefcase },
    { title: "chat", icon: FaCommentDots },
  ];

  useEffect(() => {
    const scrollHeader = () => {
      const header = document.querySelector(".header");
      if (header) {
        if (window.scrollY >= 80) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
      }
    };
    window.addEventListener("scroll", scrollHeader);
    return () => window.removeEventListener("scroll", scrollHeader);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const element = document.getElementById(section.title.toLowerCase());
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= window.innerHeight / 3) {
            currentSection = section.title.toLowerCase();
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="/" className="navbar-brand">
          <div role="img" aria-label="D Heard logo" />
        </a>

        <Nav
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <ThemeSwitch
          toggle={toggle}
          setToggle={setToggle}
          sections={sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </nav>
    </header>
  );
};
