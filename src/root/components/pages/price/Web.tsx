import React from "react";
import "./css/Web.scss";
import { IPrice } from "./Prices";
import { formatPrice } from "../../helper/helper";
interface IProps {
  basis: IPrice;
  standard: IPrice;
}

const PriceCard: React.FC<IProps> = ({ basis, standard }) => {
  return (
    <div className="price-container flex">
      <div className="flex_content flex2">
        <h2 className="card-title-price">{basis.package_name}</h2>
        <h4 className="card-sub-title-price">{basis.title}</h4>
        <span className="card-price">Kun {formatPrice(basis.price)} Kr</span>
        <p className="content">{basis.description}</p>
        <ul className="card-ul-list-price">
          <li>{basis.pointA}</li>
          <li>{basis.pointB}</li>
          <li>{basis.pointC}</li>
          <li>{basis.pointD}</li>
          <li>{basis.pointE}</li>
        </ul>
        <button className="banner__cta">
          <a href="/contact-us">
            Kontakt for Basis
            <i className="fa-solid fa-arrow-right icons-right" />
          </a>
        </button>
      </div>
      {/* <div className="flex_content flex2">
        <h2 className="card-title-price">Inovix Basis</h2>
        <h4 className="card-sub-title-price">Nettside Design og Utvikling</h4>
        <span className="card-price">Kun 14 999 Kr</span>
        <p className="content">
          Inovix Basis-pakken er det ideelle valget for dem som ønsker en rask
          og effektiv nettløsning. For 14 999 Kr får du en responsiv,
          SEO-optimalisert nettside med opptil 5 sider, inkludert ett års gratis
          domene og hosting. Perfekt for små bedrifter eller enkeltpersoner som
          ønsker å etablere seg på nett uten stress.
        </p>

        <ul className="card-ul-list-price">
          <li>5 sider for enkel navigasjon og informasjonsdeling</li>
          <li>Responsivt design som sikrer kompatibilitet på alle enheter</li>
          <li>SEO optimalisering for bedre synlighet i søkemotorer</li>
          <li>1 år gratis domene for din unike nettadresse</li>
          <li>1 år gratis hosting på pålitelige servere</li>
        </ul>
        <button className="banner__cta">
          <a href="/contact-us">
            Kontakt for Basis
            <i className="fa-solid fa-arrow-right icons-right" />
          </a>
        </button>
      </div> */}
      <div className="flex_content">
        <h2 className="card-title-price">Inovix Standard</h2>
        <h4 className="card-sub-title-price">
          Utvidet Nettside Design og Utvikling
        </h4>
        <span className="card-price">Fra 14 999 Kr</span>
        <p className="content">
          Inovix Standard-pakken er skreddersydd for å løfte din digitale
          tilstedeværelse med avanserte funksjoner og unikt design. Starter fra
          14 999 Kr, tilbyr vi en konkurransedyktig timepris på 999 kr for
          tilpasninger utover basispakken. Dette gjør pakken ideell for
          mellomstore til store bedrifter som trenger ekstra funksjoner som
          e-handelssystemer, integrerte løsninger, og dynamisk
          brukerengasjement. Med denne pakken får du alt fra skreddersydd design
          til detaljert SEO-strategi, med fokus på å møte dine unike behov og
          mål.
        </p>
        <ul className="card-ul-list-price">
          <li>Skreddersydd design som reflekterer din merkeidentitet</li>
          <li>Avanserte funksjoner og integrasjoner etter behov</li>
          <li>Detaljert SEO strategi for økt konkurransekraft</li>
          <li>Personlig konsultasjon for å sikre at alle behov møtes</li>
          <li>Tilgang til kontinuerlig teknisk støtte og vedlikehold</li>
        </ul>
        <button className="banner__cta">
          <a href="/contact-us">
            Kontakt for Standard
            <i className="fa-solid fa-arrow-right icons-right" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default PriceCard;
