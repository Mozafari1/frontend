import React from "react";
import "./css/AboutUsSection.scss";
interface IProps {
  imgSrc: string;
}
const AboutUsSection: React.FC<IProps> = ({ imgSrc }) => {
  return (
    <div className="about-us-section">
      <div className="about-us-content">
        <div className="about-us-text">
          <h2 className="about-us-title">Om Oss</h2>
          <p className="about-us-description">
            Velkommen til Inovix – din fremtidige partner i den digitale verden.
            Grunnlagt i 2024, Inovix representerer en ny æra av digitale
            løsninger, drevet av innovasjon, kreativitet og en ubøyelig streben
            etter å overgå det ordinære. Med et friskt blikk på teknologiske
            muligheter, er vi her for å omforme hvordan bedrifter og
            privatpersoner interagerer med digital teknologi. Vårt mål er å
            tilby ikke bare tjenester, men varige digitale opplevelser som
            forbedrer, forenkler og beriker.
          </p>
        </div>
        <div className="about-us-image">
          <object type="image/svg+xml" data={imgSrc} aria-label="banner" />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
