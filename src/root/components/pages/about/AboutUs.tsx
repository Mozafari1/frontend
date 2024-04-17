import React from "react";
import "./css/AboutUs.scss";
import CustomerSection from "../home/CustomerSection";
import PartnerList from "../home/PartnerList";

interface IProps {
  imgSrc: string;
}
const AboutUs: React.FC<IProps> = ({ imgSrc }) => {
  return (
    <>
      <div className="about-us-page">
        <div className="about-us-banner">
          <object type="image/svg+xml" data={imgSrc} aria-label="banner" />
          <h2 className="about-us-title-page">Om Oss</h2>
        </div>
        <div className="about-us-content-page">
          <div className="about-us-text-page">
            <p className="welcome">
              Velkommen til Inovix, hvor vår lidenskap for digital innovasjon
              møter dyp forståelse for det norske markedet. Grunnlagt i 2024,
              med røtter fast plantet i Norge, har Inovix et spesielt fokus på å
              skape skreddersydde digitale løsninger som resonnerer med norske
              bedrifter og privatpersoner.
            </p>

            <div className="title">Vårt Team</div>
            <p className="team">
              Vårt team består av engasjerte norske utviklere, designere og
              digitale strateger som alle deler en felles visjon om å utnytte
              teknologi for å skape positive endringer. Med vår lokale kunnskap
              og internasjonale erfaring, er vi godt posisjonerte til å forstå
              og møte de unike behovene til det norske markedet.
            </p>

            <div className="title">Våre Verdier</div>

            <ul>
              <li>
                <span> Innovasjon på Norske Premisser </span>
                <span>
                  Vi kombinerer global teknologisk innsikt med lokal forståelse
                  for å skape løsninger som er skreddersydd for Norge.
                </span>
              </li>
              <li>
                <span>Kvalitet i Alle Led</span>
                <span>
                  Fra idé til implementering legger vi vår stolthet i å levere
                  arbeid av høyeste kvalitet, som står seg over tid.
                </span>
              </li>
              <li>
                <span> Kundeorientert</span>
                <span>
                  Din visjon er vår drivkraft. Vi jobber tett sammen med deg for
                  å sikre at sluttproduktet ikke bare oppfyller, men overgår
                  dine forventninger.
                </span>
              </li>
              <li>
                <span>Bærekraftig Utvikling</span>
                <span>
                  Vi er forpliktet til bærekraft og søker alltid etter de mest
                  miljøvennlige løsningene i våre prosjekter.
                </span>
              </li>
            </ul>

            <div className="title">Hvorfor Velge Inovix? </div>
            <p className="why">
              I et landskap hvor digital tilstedeværelse er mer kritisk enn noen
              gang, skiller Inovix seg ut med vår kombinasjon av lokal
              ekspertise og global innsikt. Vi forstår de særegne utfordringene
              norske bedrifter står overfor og tilbyr skreddersydde løsninger
              for å møte disse. Enten det dreier seg om å designe en
              engasjerende nettside, utvikle en innovativ app, eller
              implementere en helhetlig digital markedsføringsstrategi, er
              Inovix din ideelle partner.
            </p>

            <p className="join">
              Bli med på reisen med Inovix og oppdag hvordan vi sammen kan
              transformere din digitale tilstedeværelse, styrke din merkevare og
              oppnå dine forretningsmål. Vår dedikasjon til ditt suksess er det
              som driver oss hver dag.
            </p>

            <p className="end">
              Velkommen til Inovix – der din digitale fremtid begynner.
            </p>
          </div>
          <div className="about-us-page-contacts">
            <div>
              <a href="mailto:kontakt@inovix.no" className="contact-us">
                <i className="fa-regular fa-envelope icons-left" />
                kontakt@inovix.no
              </a>
            </div>
            <div>
              <a href="tel:+47 402 96 867" className="contact-us">
                <i className="fa-solid fa-phone icons-left" />
                +47 402 96 867
              </a>
            </div>
            <div
              className="contact-us contact-us-button-contact-us"
              onClick={() => (window.location.href = "/contact-us")}
            >
              Kontakt oss
              <i className="fa-solid fa-arrow-right icons-right" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <CustomerSection />
        <PartnerList />
      </div>
    </>
  );
};
export default AboutUs;
