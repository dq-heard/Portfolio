import React, { useEffect, useState } from "react";
import { NavItems } from "../../constants/utils";
import { NavType, IconType } from "../../constants/types";

interface NavProps extends NavType {
  sections: IconType[];
}

const Nav: React.FC<NavProps> = ({
  sections,
  activeSection,
  setActiveSection,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track mobile state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update mobile state on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="nav-menu" id="nav-menu">
      <NavItems
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showIcons={isMobile}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Nav;
