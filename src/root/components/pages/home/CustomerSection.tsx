import React, { useEffect, useState } from "react";
import "./css/CustomerSection.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-slick";

const CustomerSection: React.FC = () => {
  const customerFeedbacks = [
    {
      name: "Anna B.",
      role: "Grunnlegger av EcoShop",
      text: "Inovix forvandlet vår nettbutikk fra å være bare nok en nettbutikk til å bli en markedsleder innen bærekraftig handel. Deres skreddersydde e-handelsløsning og intuitive design har doblet vår konverteringsrate!",
    },
    {
      name: "John D.",
      role: "Markedsføringsdirektør",
      text: "Inovix har vært en uvurderlig partner for oss. Deres digitale markedsføring har økt vår synlighet og salg betydelig. Vi er svært fornøyde med resultatene og ser frem til å fortsette samarbeidet.",
    },
    {
      name: "Mia S.",
      role: "Eier av Mia's Cafe",
      text: "Inovix har hjulpet oss med å bygge en sterk merkevare og en solid online tilstedeværelse. Deres kreative tilnærming og strategiske råd har vært avgjørende for vår suksess.",
    },
    {
      name: "Oscar T.",
      role: "Eier av Oscar's Barbershop",
      text: "Inovix har hjulpet oss med å bygge en sterk merkevare og en solid online tilstedeværelse. Deres kreative tilnærming og strategiske råd har vært avgjørende for vår suksess.",
    },
    {
      name: "Mia S.",
      role: "Eier av Mia's Cafe",
      text: "Inovix har hjulpet oss med å bygge en sterk merkevare og en solid online tilstedeværelse. Deres kreative tilnærming og strategiske råd har vært avgjørende for vår suksess.",
    },
    {
      name: "Oscar T.",
      role: "Eier av Oscar's Barbershop",
      text: "Inovix har hjulpet oss med å bygge en sterk merkevare og en solid online tilstedeværelse. Deres kreative tilnærming og strategiske råd har vært avgjørende for vår suksess.",
    },

    // Legg til flere kundeomtaler etter samme format
  ];

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768) {
        // På større skjermer
        if (customerFeedbacks.length >= 3) {
          setSlidesToShow(3); // Vis 3 kort i karusellen
        } else {
          setSlidesToShow(customerFeedbacks.length); // Vis antall omtaler uten karusell
        }
      } else {
        // På små skjermer
        setSlidesToShow(1); // Vis alltid 1 kort i karusellen
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [customerFeedbacks.length]);

  const settings = {
    infinite: customerFeedbacks.length > slidesToShow, // Aktiverer infinite bare når det er flere kort enn slidesToShow
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: customerFeedbacks.length > 1, // Aktiverer autoplay bare når det er mer enn en omtale
    autoplaySpeed: 2500,
  };

  return (
    <div className="customer-section">
      <div className="customer-section__container">
        <div className="customer-section-text">
          <h2 className="customer-section__title">Det Våre Kunder Sier</h2>
          <p className="customer-section__description">
            Vi setter stor pris på våre kunders mening og ser frem til å dele
            deres suksesshistorier. Din tilfredshet og resultater er det som
            motiverer oss hver dag. Bli en del av vår voksende kundebase og
            opplev forskjellen Inovix kan gjøre for din digitale
            tilstedeværelse.
          </p>
        </div>
        <div className="carosel-customer">
          <Carousel {...settings}>
            {customerFeedbacks.map((feedback, index) => (
              <div key={index} className="feedback-card">
                <p className="feedback-text">{feedback.text}</p>
                <p className="feedback-author">
                  {feedback.name} - {feedback.role}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CustomerSection;
