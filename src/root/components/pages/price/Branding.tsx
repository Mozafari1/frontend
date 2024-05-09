import React from "react";
import { IPrice } from "./Prices";
interface IProps {
  branding: IPrice;
  support: IPrice;
}
const Branding: React.FC<IProps> = ({ branding, support }) => {
  return (
    <div className="single-card-containers">
      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">Logo og Branding</h2>
          <span className="card-price">Timepris: 899 Kr</span>
          <p className="content">
            Vårt team av kreative designere hjelper deg med å utvikle en unik
            logo og branding som gjenspeiler din virksomhets identitet og
            verdier. Enten du starter fra bunnen av eller ønsker en
            revitalisering av ditt nåværende merke, tilpasser vi våre tjenester
            for å møte dine behov.
          </p>
          <p className="note">
            Vær oppmerksom på at den endelige prisen vil avhenge av prosjektets
            omfang og kompleksitet. Vi tilbyr en gratis konsultasjon for å
            diskutere dine ideer og gi et estimat basert på dine spesifikke
            krav.
          </p>
          <ul className="card-ul-list-price">
            <li>Individuelt tilpasset logodesign</li>
            <li>Helhetlig visuell identitet for ditt merke</li>
            <li>Branding-strategi og retningslinjer</li>
            <li>Markedsføringsmateriell og forretningsdokumenter</li>
            <li>Digital og trykt merkevarepakke</li>
          </ul>
          <button className="banner__cta">
            <a href="/contact-us">
              Kontakt for Logo og Branding
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
      </div>

      <div className="single-card-container">
        <div className="single-card-content">
          <h2 className="card-title-price">24/ 7 Teknisk Støtte</h2>
          <p className="content">
            Hos Inovix forstår vi viktigheten av kontinuerlig og pålitelig
            støtte for din digitale tilstedeværelse. Vår 24/7 tekniske støtte er
            designet for å gi deg ro i sinnet, med eksperthjelp alltid
            tilgjengelig for å løse eventuelle utfordringer som måtte oppstå.
            Enten det gjelder en enkel forespørsel eller en kritisk situasjon,
            vårt dedikerte team står klart til å assistere deg, dag og natt.
          </p>
          <p className="note">
            Denne tjenesten er tilgjengelig gjennom ulike abonnementsmodeller
            som passer både små og store bedrifter. Kontakt oss for å diskutere
            hvilken pakke som best møter dine behov og for å få mer informasjon
            om våre konkurransesterke priser.
          </p>
          <button className="banner__cta">
            <a href="/contact-us">
              Kontakt for Støtte
              <i className="fa-solid fa-arrow-right icons-right" />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Branding;
