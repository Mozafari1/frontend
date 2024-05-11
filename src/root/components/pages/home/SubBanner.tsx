import React, { useEffect, useState } from "react";
import Carousel from "react-slick";

import "./css/SubBanner.scss";
const SubBanner: React.FC = () => {
  const imgSrc = ["/website.svg", "marketing.svg", "ecommerce.svg"];

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768) {
        if (imgSrc.length >= 3) {
          setSlidesToShow(3);
        } else {
          setSlidesToShow(imgSrc.length);
        }
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [imgSrc.length]);

  const settings = {
    infinite: imgSrc.length > slidesToShow, // Aktiverer infinite bare når det er flere kort enn slidesToShow
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: imgSrc.length > 1, // Aktiverer autoplay bare når det er mer enn en omtale
    autoplaySpeed: 2500,
  };

  return (
    <div className="unique-services-section">
      <div className="services-content">
        <div className="content-part">
          <h2 className="unique-services-title">
            Skreddersydde Digitale Løsninger for Din Suksess
          </h2>
          <p className="unique-services-description">
            Hos inovix, forstår vi verdien av sterk digital tilstedeværelse. Med
            vår ekspertise designer vi responsive nettsider og dynamiske
            nettbutikker, og implementerer målrettet digital markedsføring som
            resonnerer med ditt publikum. Engasjement for kvalitet og innovasjon
            står i sentrum av alt vi gjør, sikret gjennom personlig oppfølging
            og tilpassede strategier for hver kunde. La oss transformere din
            digitale visjon til virkelighet.
          </p>
        </div>

        <div className="services-images">
          <Carousel {...settings}>
            {imgSrc?.map((img: any, index) => (
              <div
                id={`section-${index}`}
                className="services-image"
                key={index}
              >
                <object
                  type="image/svg+xml"
                  data={`./${img}`}
                  aria-label={`image-${index}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
