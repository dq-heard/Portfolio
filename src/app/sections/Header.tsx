import { Hero, SectionProps } from "@/app/utils/types";
import { DynamicIcon } from "@/app/components/DynamicIcon";
import { useSectionReady } from "../hooks/useSectionReady";
import { getReadableSocialLabel } from "../utils/aria";
import { Avatar } from "../components";

import { sig, stencil } from "../utils/fonts";
import "./styles/header.css";

const Header = ({ data, onContentLoaded }: SectionProps<Hero>) => {
  useSectionReady(onContentLoaded);

  if (!data) return null;
  return (
    <header
      aria-labelledby="header-heading"
      aria-label="Site introduction and profile"
    >
      <div className="profile-section">
        <Avatar asset={data.avatar} aria-hidden="true" />

        <div className="profile-details">
          <h1 className={sig.className} id="header-heading">
            {data.title}
          </h1>
          <p className={`${stencil.className} profile-role`}>{data.role}</p>
          <p>{data.desc}</p>
          <div className="social-links">
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
                  <span>{social.slug}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
