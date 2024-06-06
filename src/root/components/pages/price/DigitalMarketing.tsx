import React from "react";
import { IPrice } from "./Prices";
interface IProps {
  drift: IPrice;
  marketing: IPrice;
}
const DigitalMarketing: React.FC<IProps> = ({ drift, marketing }) => {
  return (
    <div className="single-card-containers">
      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">Drift og Vedlikehold</h2>
          <h4 className="card-sub-title-price">
            Månedlig Abonnement for Kontinuerlig Service
          </h4>
          <span className="card-price">Månedlig Abonnement: 999 Kr</span>
          <p className="content">
            Med vårt månedlige abonnement på drift og vedlikehold garanterer vi
            kontinuerlig optimalisering og sikkerhet for din nettløsning. For en
            fast månedlig sum får du tilgang til våre eksperter som sikrer at
            din plattform fungerer feilfritt. Abonnementet fokuserer på løpende
            vedlikehold og eksisterende funksjonalitetsstøtte med bindingstid på
            ett år og faktureres månedlig.
          </p>
          <p className="note">
            Vær oppmerksom på at abonnementet ikke dekker kostnader knyttet til
            nye implementeringer eller større funksjonsoppdateringer. Disse
            tjenestene er tilgjengelige etter avtale og vil bli fakturert
            separat.
          </p>
          <ul className="card-ul-list-price">
            <li>
              Regelmessige sikkerhetsoppdateringer og ytelsesoptimaliseringer
            </li>
            <li>Proaktiv overvåking og feilsøking</li>
            <li>Teknisk støtte for daglige operasjoner</li>
            <li>Backup og gjenoppretting for å sikre dataintegritet</li>
            <li>Bindingstid på 1 år med mulighet for fornyelse</li>
          </ul>
        </div>
      </div>
      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">Digital Markedsføring</h2>
          <h4 className="card-sub-title-price">Skreddersydd Markedsstrategi</h4>
          <span className="card-price">Timepris: 899 Kr</span>
          <p className="content">
            Vår tilnærming til digital markedsføring er skreddersydd for å møte
            dine unike behov og mål. Vi tilbyr alt fra SEO, PPC,
            innholdsmarkedsføring til sosiale mediestrategier og mer. Vår
            timepris på 1299 kr reflekterer vår fleksibilitet til å tilpasse
            tjenester etter dine krav. Vær oppmerksom på at tilleggskostnader
            kan påløpe basert på spesifikke kampanjekrav, annonsebudsjetter og
            andre eksterne kostnader.
          </p>
          <ul className="card-ul-list-price">
            <li>Tilpassede markedsføringsstrategier</li>
            <li>Effektiv bruk av budsjettet ditt</li>
            <li>Kontinuerlig analyse og rapportering</li>
            <li>Økt synlighet og merkevarebevissthet</li>
            <li>Tilleggskostnader avklares før kampanjestart</li>
          </ul>
          <button className="banner__cta" onClick={()=>{
            window.location.assign("/contact-us")
             }}>
            <a href="/contact-us">
              Kontakt for skreddersydd
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketing;
