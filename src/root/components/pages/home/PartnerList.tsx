import React, { useEffect, useState } from "react";
import "./css/PartnerList.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-slick";

const PartnerList: React.FC = () => {
  const partnerlists = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ];

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768) {
        // På større skjermer
        if (partnerlists.length >= 10) {
          setSlidesToShow(10); // Vis 3 kort i karusellen
        } else {
          setSlidesToShow(partnerlists.length); // Vis antall omtaler uten karusell
        }
      } else {
        // På små skjermer
        setSlidesToShow(3); // Vis alltid 1 kort i karusellen
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [partnerlists.length]);

  const settings = {
    infinite: partnerlists.length > slidesToShow, // Aktiverer infinite bare når det er flere kort enn slidesToShow
    speed: 500,
    slidesToShow: slidesToShow,
    autoplay: partnerlists.length > 3, // Aktiverer autoplay bare når det er mer enn en omtale
    autoplaySpeed: 2000,
  };

  return (
    <div className="partner-list-section">
      <div className="partner-section-container">
        <Carousel {...settings}>
          {partnerlists.map((feedback, index) => (
            <img key={index} className="partner-logo" src={feedback} alt="" />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PartnerList;
