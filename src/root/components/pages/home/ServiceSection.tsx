import React from "react";
import "./css/ServiceSection.scss";
interface IProps {
  imgSrc: string;
}
const ServiceSection: React.FC<IProps> = ({ imgSrc }) => {
  return (
    <div className="our-service">
      <div className="container">
        <div className="our-service-left">
          <h2 className="our-service-title">Uførsk Våre Tjenester</h2>

          <p className="our-service-description">
            Ved inovix tilbyr vi et bredt spekter av digitale løsninger designet
            for å møte de varierte behovene til moderne virksomheter. Vår
            tilnærming fokuserer på å skape skreddersydde, innovative og
            effektive strategier som gir reelle resultater. Enten du søker å
            styrke din digitale tilstedeværelse, maksimere online salg, eller
            effektivisere bedriftsoperasjoner, har vårt team av eksperter de
            nødvendige verktøyene og innsikten til å hjelpe deg med å oppnå dine
            mål.
          </p>
          <div className="our-service-item">
            <ul className="our-service-list">
              <li>Nettside Design og Utvikling</li>
              <li>Mobil App Utvikling</li>
              <li> Nettbutikk Utvikling</li>
              <li>Drift og Vedlikehold</li>
              <li>Digital Markedsføring</li>
              <li>Logo og Branding</li>
              <li>API Utvikling og Integrasjon</li>
              <li>24 / 7 Teknisk Støtte</li>
            </ul>
          </div>
        </div>
        <div className="our-service-right">
          <div className="our-service-image">
            <object type="image/svg+xml" data={imgSrc} aria-label="service" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
