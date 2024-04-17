import React, { useEffect, useState } from "react";
import "./css/ServicePage.scss";
import ServicePageCards from "./ServicePageCards";
import getApiUrl from "../../helper/helper";
export interface IService {
  title: string;
  less_content: string;
  main_content: string;
  sub_title: string;
  sub_content: string;
  sub_points_title: string;
  sub_point_titleA: string;
  sub_point_contentA: string;
  sub_point_titleB: string;
  sub_point_contentB: string;
  sub_point_titleC: string;
  sub_point_contentC: string;
  sub_point_titleD: string;
  sub_point_contentD: string;
  sub_point_titleE: string;
  sub_point_contentE: string;
  summary_title: string;
  summary_main_content: string;
  summary_sub_content: string;
  summary_sub_sub_content: string;
  file_type: string;
  file_name: string;
}
const ServicePage: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSuccess = () => {
    fetch(`${getApiUrl()}/get-services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching price data:", error);
      });
  };

  useEffect(() => {
    handleSuccess();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-page">
      <div className="service-banner">
        <object
          type="image/svg+xml"
          data="/service5-2.svg"
          aria-label="banner"
        />
        <h2 className="service-title-page">Våre Tjenester</h2>
      </div>
      <div className="service-main-content-page">
        <div className="service-main-text-page">
          På Inovix er vi dedikerte til å tilby våre kunder skreddersydde
          digitale løsninger som transformerer deres virksomhet. Våre tjenester
          er utformet for å adressere de unike utfordringene og mulighetene
          moderne bedrifter står overfor i det digitale landskapet. Fra estetisk
          tiltalende nettsidedesign til robust mobilapputvikling, effektiv
          e-handelsløsninger, pålitelig drift og vedlikehold, dynamisk digital
          markedsføring, kreativ logo og branding, til avansert API-utvikling og
          integrasjon, samt vår uovertrufne 24/7 tekniske støtte, sikrer vi at
          din bedrift ikke bare overlever, men trives i den digitale æraen. Vårt
          mål er å være den foretrukne partneren som forvandler din visjon til
          virkelighet, med en tilnærming som blander innovasjon med effektivitet
          for å levere målbare resultater.
        </div>
      </div>
      <ServicePageCards data={services} />
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
          className="contact-us"
          onClick={() => (window.location.href = "/contact-us")}
        >
          Kontakt oss
          <i className="fa-solid fa-arrow-right icons-right" />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
