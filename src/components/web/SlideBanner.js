import React from "react";
import { Fade } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

const SlideBanner = () => {
  const fadeImages = [
    "../../logo.png",
    "../../logo.png",
    "../../logo.png",
  ];
  return (
    <div>
      <div className="slide-container">
        <Fade>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} alt="" />
            </div>
            <p>First Slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={fadeImages[1]} alt="" />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} alt="" />
            </div>
            <p>Third Slide</p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default SlideBanner;
