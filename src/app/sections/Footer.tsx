import { getReadableSocialLabel } from "../utils/aria";
import { Hero, SectionProps } from "../utils/types";
import { useSectionReady } from "../hooks/useSectionReady";
import { DynamicIcon } from "@/app/components/DynamicIcon";

import "./styles/header.css";

const Footer = ({ data, onContentLoaded }: SectionProps<Hero>) => {
  useSectionReady(onContentLoaded);

  if (!data) return null;

  return (
    <footer role="contentinfo">
      <div className="footer-content">
        <div className="footer-text">
          <p>&copy; 2025 {data.title}. All Rights Reserved.</p>
        </div>
        <div className="footer-links">
          {data.socials.map((social) => {
            const label =
              getReadableSocialLabel(social.icon) || "external link";

            return (
              <a
                key={social.slug}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="social-item"
                aria-label={`Link to ${label} profile`}
                title={label}
              >
                <DynamicIcon className="social-icon" name={social.icon} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
