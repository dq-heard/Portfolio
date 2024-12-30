import { useState, useEffect } from "react";
import { FaArrowUpRightDots, FaPenRuler, FaPuzzlePiece } from "react-icons/fa6";

import GridBox from "../../graphics/GridBox";
import "./Services.scss";

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideSpeed = 4500;
  const slideContent = [
    {
      img: <FaPenRuler />,
      name: "Responsive Web Design",
      desc: "Crafting visually appealing and fully responsive websites that adapt seamlessly to any device, ensuring an excellent user experience on desktops, tablets, and smartphones.",
    },
    {
      img: <FaPuzzlePiece />,
      name: "Customized Branding",
      desc: "Building memorable, eye-catching signage tailored to your specific desires, using modern technologies to create stylish logos and distinctive wordmarks for your business.",
    },
    {
      img: <FaArrowUpRightDots />,
      name: "Cohesive Content",
      desc: "Enhancing user engagement with colorful and aesthetically pleasing language, prioritizing creativity, uniqueness, and high retention rates to maximize the first impression.",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideContent.length);
    }, slideSpeed);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="services">
      <div className="wrap">
        <GridBox />
        <ul className="dots">
          {slideContent.map((_, index) => (
            <li
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></li>
          ))}
        </ul>
        <div className="content">
          {slideContent.map((item, index) => (
            <div key={index} className={index === currentSlide ? "active" : ""}>
              <div className="img">
                <div className="spotlight"></div>
                {item.img}
              </div>
              <h2>{item.name}</h2>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="box"></div>
    </div>
  );
};
