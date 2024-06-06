import React from "react";
import "./css/MainBanner.scss";

const MainBanner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner__container">
        <div className="left">
          <h1 className="banner__headline">
            Realiser Ditt Potensial med Skreddersydde Digitale Løsninger
          </h1>
          <p className="banner__tagline">
            La Teknologi Forsterke Din Visjon – Samarbeid med Ekspertene
          </p>
          <p className="banner__services">
            Spesialister på Webdesign, Apputvikling, E-handel, og Mer
          </p>
          <button className="banner__cta" onClick={()=>{
   window.location.assign(
                                                    "/contact-us"
                                                )
    }
          }>
            <a href="/contact-us">
              Ta Steget Videre – Kontakt Oss I Dag
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
        <div className="right">
          <object
            type="image/svg+xml"
            data={"./banner.svg"}
            aria-label="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
