import React from "react";
import { IPrice } from "./Prices";
interface IProps {
  app: IPrice;
  integration: IPrice;
}
const AppApi: React.FC<IProps> = ({ app, integration }) => {
  return (
    <div className="single-card-containers">
      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">Mobil App Utvikling</h2>
          <h4 className="card-sub-title-price">
            Native & Cross-Plattform Løsninger
          </h4>
          <span className="card-price">Timepris 899 Kr</span>
          <p className="content">
            Hos Inovix tilbyr vi skreddersydde mobilappløsninger som møter dine
            spesifikke behov. Med vår ekspertise kan vi levere både native og
            cross-plattform apper som sikrer optimal ytelse og brukeropplevelse.
            Enten det er for iOS, Android, eller begge, fokuserer vi på å skape
            intuitive, funksjonelle og estetisk tiltalende apper. Vårt team
            arbeider tett med deg gjennom hele utviklingsprosessen for å sikre
            at sluttproduktet ikke bare oppfyller, men overgår dine
            forventninger.
          </p>

          <ul className="card-ul-list-price">
            <li>Skreddersydd appdesign som reflekterer din merkevare</li>
            <li>Utmerket brukeropplevelse og brukergrensesnitt</li>
            <li>Funksjonell og sikker backend-utvikling</li>
            <li>API-integrasjoner for utvidet funksjonalitet</li>
            <li>Testing og kvalitetssikring for feilfri ytelse</li>
            <li>Markedslansering og kontinuerlig support</li>
          </ul>
          <button className="banner__cta"onClick={()=>{
   window.location.assign(
                                                    "/contact-us"
                                                )
    }>
            <a href="/contact-us">
              Kontakt for Mobil App Utvikling
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
      </div>
      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">API Utvikling og Integrasjon</h2>
          <h4 className="card-sub-title-price">
            Effektiviser Din Digitale Arkitektur
          </h4>
          <span className="card-price">Timepris 999 Kr</span>
          <p className="content">
            Vårt team hos Inovix spesialiserer seg på å utvikle robuste
            API-løsninger som muliggjør sømløs integrasjon med
            tredjepartssystemer, for å utvide og forbedre funksjonaliteten til
            din digitale infrastruktur. Ved å tilpasse hvert API etter dine
            unike forretningsbehov, sikrer vi at systemene dine kommuniserer
            effektivt og dataflyten forbedres, noe som fører til økt
            produktivitet og bedre brukeropplevelse.
          </p>
          <ul className="card-ul-list-price">
            <li>Tilpassede APIer for optimalisert datautveksling</li>
            <li>Integrasjon med ledende tredjepartstjenester og plattformer</li>
            <li>Forbedret dataflyt og systemkommunikasjon</li>
            <li>Sikkerhetsprotokoller for å beskytte sensitiv informasjon</li>
            <li>Skalerbarhet for fremtidig vekst og utvikling</li>
          </ul>
          <p className="additional-costs-notice">
            Merk: Kostnader relatert til tredjepartstjenester er ikke inkludert
            og vil bli fakturert separat.
          </p>
          <button className="banner__cta"onClick={()=>{
   window.location.assign(
                                                    "/contact-us"
                                                )
    }>
            <a href="/contact-us">
              Kontakt for API Utvikling
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppApi;
