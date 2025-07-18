import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { client } from "../../client";
import { Socials } from "../../constants/utils";
import { images } from "../../constants";
import "./Home.scss";

interface ResumeData {
  resumeFile: {
    asset: {
      url: string;
    };
  };
}

interface HomeProps {
  onContentLoaded: () => void;
}

export const Home: React.FC<HomeProps> = ({ onContentLoaded }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      const query = `*[_type == "resume"][0]{resumeFile {asset->{url}}}`;
      const result: ResumeData = await client.fetch(query);
      setResumeData(result);
      onContentLoaded(); // Call the callback here
    };
    fetchResumeData();
  }, [onContentLoaded]);

  const downloadUrl = `${resumeData?.resumeFile.asset.url}?dl=dq-heard.pdf`;

  return (
    <section className="home" id="home">
      <div className="container">
        <div className="content flex">
          <div className="left w-half">
            <div className="hero-content-box">
              <div className="hero-name" role="img" aria-label="DQ Heard"></div>
              <h1 className="hero-title">
                <span className="front-end">
                  Under
                  <br />
                </span>
                Re-Construction
              </h1>
              <p className="lead">
                Please disregard any graphical inconsistencies you see and check
                back at a later date.
              </p>

              <div className="button-box flex">
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
                <a href={downloadUrl} className="btn-primary" download>
                  Résumé <FaDownload />
                </a>
              </div>
            </div>
          </div>
          <div className="right w-half">
            <div className="hero-image-box text-center">
              <img src={images.user} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
