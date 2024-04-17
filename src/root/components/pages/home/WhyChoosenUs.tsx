import React from "react";
import "./css/WhyChoosenUs.scss";

const WhyChoosenUs: React.FC = () => {
  return (
    <div className="why-us-section">
      <div className="why-us-container">
        <div className="why-us-left-content">
          <h2 className="why-us-title">Hvorfor Velge Inovix?</h2>
          <p className="why-us-description">
            I en verden hvor digital tilstedeværelse er avgjørende, skiller
            Inovix seg ut som din foretrukne partner for å navigere i det
            digitale landskapet. Med en lidenskap for teknologi og innovasjon,
            tilbyr Inovix skreddersydde digitale løsninger som speiler din unike
            merkevareidentitet og engasjerer målgruppen din effektivt. Vårt mål
            er å sikre at din digitale transformasjon ikke bare oppfyller dagens
            behov, men også posisjonerer deg for fremtidig vekst og suksess.
          </p>
        </div>
        <div className="why-us-right-content">
          <div className="why-us-points">
            <ul className="why-us-list">
              <li>
                <span className="li-title">Skreddersydd Webdesign</span>
                <span className="li-description">for merkevarefremheving.</span>
              </li>
              <li>
                <span className="li-title">Apputvikling</span>
                <span className="li-description">
                  for topp brukeropplevelser på alle plattformer.
                </span>
              </li>
              <li>
                <span className="li-title">E-handel</span>
                <span className="li-description">
                  som booster salg og kundeengasjement.
                </span>
              </li>
              <li>
                <span className="li-title">Drift & Vedlikehold</span>
                <span className="li-description">
                  sikrer din digitale pålitelighet.
                </span>
              </li>
              <li>
                <span className="li-title">Digital Markedsføring</span>
                <span className="li-description">
                  øker din online rekkevidde.
                </span>
              </li>
              <li>
                <span className="li-title">Branding</span>
                <span className="li-description">
                  definerer din unike visuelle identitet.
                </span>
              </li>
              <li>
                <span className="li-title">API & Integrasjon</span>
                <span className="li-description">
                  forbedrer systemeffektivitet.
                </span>
              </li>
              <li>
                <span className="li-title">24/7 Støtte</span>
                <span className="li-description">
                  gir deg kontinuerlig hjelp.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyChoosenUs;
