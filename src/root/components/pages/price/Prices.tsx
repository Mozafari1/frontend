import React, { useEffect, useState } from "react";
import "./css/Prices.scss";
import "./css/common.scss";
import PriceCard from "./Web";
import AppApi from "./AppApi";
import DigitalMarketing from "./DigitalMarketing";
import Branding from "./Branding";
import getApiUrl from "../../helper/helper";
export interface IPrice {
  package_name: string;
  title: string;
  description: string;
  price: number;
  pointA: string;
  pointB: string;
  pointC: string;
  pointD: string;
  pointE: string;
}
const Prices: React.FC = () => {
  const [prices, setPrices] = useState<IPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSuccess = () => {
    fetch(`${getApiUrl()}/get-prices`)
      .then((response) => response.json())
      .then((data) => {
        setPrices(data);
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
    <>
      <div className="price-us-page">
        <div className="price-us-banner">
          <object
            type="image/svg+xml"
            data="./price-11.svg"
            aria-label="banner"
          />
          <h2 className="price-us-title-page">
            Transparent Prisstrategi hos Inovix
          </h2>
        </div>
        <div className="price-us-content-page">
          <div className="price-us-text-page">
            <p>
              Hos Inovix tror vi på fullstendig gjennomsiktighet rundt våre
              priser. Vi forstår viktigheten av klarhet i kostnader når du
              vurderer digitale løsninger for din virksomhet. Derfor streber vi
              etter å gi en klar og omfattende oversikt over prisene for våre
              tjenester. Vårt engasjement er å levere enestående verdi gjennom
              våre tjenester, samtidig som vi sikrer at prisstrukturen vår er
              rettferdig og tilgjengelig. Vår tilnærming til prissetting er
              basert på å forstå dine spesifikke behov og tilby tilpassede
              løsninger som matcher ditt budsjett og dine mål. Ta en titt på vår
              prisguide for å få en forståelse av de ulike tjenestene vi tilbyr
              og deres tilhørende kostnader. Vi er her for å diskutere dine
              behov ytterligere og tilby en skreddersydd løsning som best møter
              dine krav.
            </p>
          </div>
        </div>

        <div className="custom-shape-divider-bottom-1708374905">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V6c0,1,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div className="price-web">
        <PriceCard basis={prices?.[0]} standard={prices?.[1]} />
        <div className="custom-shape-divider-bottom-1708449623">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 598.97 114.72 1200 0z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <div className="price-appapi">
        <AppApi app={prices?.[2]} integration={prices?.[3]} />
        <div className="custom-shape-divider-bottom-1708452161">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <div className="price-digital-marketing">
        <DigitalMarketing drift={prices?.[4]} marketing={prices?.[5]} />
        <div className="custom-shape-divider-bottom-1708452608">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <div className="price-branding">
        <Branding branding={prices?.[6]} support={prices?.[7]} />
        <div className="custom-shape-divider-bottom-1708452414">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Prices;
