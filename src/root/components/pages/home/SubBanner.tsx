import React, { useEffect, useState } from "react";
import "./css/SubBanner.scss";
import getApiUrl from "../../helper/helper";
interface IProps {
  imgSrc: string[];
}
const SubBanner: React.FC<IProps> = ({ imgSrc }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobile, imgSrc.length]);
  return (
    <div className="unique-services-section">
      <div className="services-content">
        <h2 className="unique-services-title">
          Skreddersydde Digitale Løsninger for Din Suksess
        </h2>
        <p className="unique-services-description">
          Hos inovix, forstår vi verdien av sterk digital tilstedeværelse. Med
          vår ekspertise designer vi responsive nettsider og dynamiske
          nettbutikker, og implementerer målrettet digital markedsføring som
          resonnerer med ditt publikum. Engasjement for kvalitet og innovasjon
          står i sentrum av alt vi gjør, sikret gjennom personlig oppfølging og
          tilpassede strategier for hver kunde. La oss transformere din digitale
          visjon til virkelighet.
        </p>
        <div className="services-images">
          {isMobile ? (
            <div className="services-image">
              <object
                type="image/svg+xml"
                data={`${getApiUrl()}/images/${imgSrc[currentIndex]}`}
                aria-label={`image-${currentIndex}`}
              />
            </div>
          ) : (
            imgSrc.map((img, index) => (
              <div
                id={`section-${index}`}
                className="services-image"
                key={index}
              >
                <object
                  type="image/svg+xml"
                  data={`${getApiUrl()}/images/${img}`}
                  aria-label={`image-${index}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
