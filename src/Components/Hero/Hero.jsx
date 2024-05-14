import React from "react";
import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
const scrollToNewCollection = () => {
  const newCollectionElement = document.getElementById("newCollection");
  if (newCollectionElement) {
    const yOffset = -200;
    const targetY =
      newCollectionElement.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }
};


  return (
    <div className="hero">
      <div className="hero-left">
        <p>New</p>
        <p>Collections</p>
        <p>Arrived</p>
        <div className="hero-latest-btn" onClick={scrollToNewCollection}>
          <div>Check It Out!</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
