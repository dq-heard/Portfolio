import { useEffect, useState } from "react";
import { Socials } from "../../constants/utils";
import "./Footer.scss";

export const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer id="footer">
      <div className="spotlight"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <a href="/" className="footer-name">
              <div role="img" aria-label="D Heard logo" />
            </a>
            <div className="social-handles flex">
              {Socials.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle flex"
                  key={social.title}
                >
                  <social.icon />
                </a>
              ))}
            </div>
            <p className="footer-copyright">
              © {year} D Heard. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
