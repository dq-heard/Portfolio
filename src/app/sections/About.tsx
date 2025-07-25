import { Bio, SectionProps } from "@/app/utils/types";
import { useSectionReady } from "../hooks/useSectionReady";
import { BsPersonFill } from "react-icons/bs";
import { bigShoulders } from "../utils/fonts";
import "./styles/about.css";

const About = ({ data, onContentLoaded }: SectionProps<Bio>) => {
  useSectionReady(onContentLoaded);

  return (
    <section className="section-card" aria-labelledby="about-heading">
      <h2
        id="about-heading"
        className={`${bigShoulders.className} section-title`}
      >
        <BsPersonFill aria-hidden="true" focusable="false" />
        About Me
      </h2>
      <div className="section-content">
        {data ? (
          <>
            <p>{data.p1}</p>
            <p>{data.p2}</p>
          </>
        ) : (
          <p className="loading" aria-live="polite">
            Loading about me...
          </p>
        )}
      </div>
    </section>
  );
};

export default About;
