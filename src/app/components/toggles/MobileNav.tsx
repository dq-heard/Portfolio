import { BsList, BsXLg } from "react-icons/bs";
import "./toggles.css";

const MobileNav = ({
  isActive,
  toggleActive,
}: {
  isActive: boolean;
  toggleActive: () => void;
}) => (
  <button
    className="mobile-nav-toggle glass-button"
    onClick={toggleActive}
    aria-label={isActive ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={isActive}
  >
    {isActive ? (
      <BsXLg aria-hidden="true" focusable="false" />
    ) : (
      <BsList aria-hidden="true" focusable="false" />
    )}
  </button>
);

export default MobileNav;
