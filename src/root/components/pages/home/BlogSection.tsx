import React, { useEffect, useState } from "react";
import Carousel from "react-slick";
import "./css/BlogSection.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getApiUrl from "../../helper/helper";
export interface IBlog {
  id: number;
  title: string;
  description: string;
  sub_description: string;
  sub_sub_description: string;
  file_type: string;
  file_name: string;
}
const BlogSection: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Fremtidens Webdesign – Hva Kan Vi Forvente?",
      content:
        "Webdesign står aldri stille, og med teknologiens raske utvikling er det spennende å spekulere i hva fremtiden bringer. Fra AI-drevne design til fullstendig immersive opplevelser, utforsker vi de nye trendene som vil forme vår digitale verden. Vil virtuell og utvidet virkelighet bli en standard for online interaksjon? Hvordan vil brukeropplevelsen utvikle seg med mer personlige og tilpasningsdyktige nettsider? Bli med oss for en dypdykk i webdesignens fremtidige landskap.",
      image: "/news.png",
    },
    {
      id: 2,
      title: "Bærekraft i Digitalt Design – Mer enn Bare en Trend",
      content:
        "Bærekraft blir stadig viktigere, ikke bare i den fysiske verden, men også i digitalt design. Fra å redusere karbonavtrykket av nettsider til etisk design som fremmer inkludering og tilgjengelighet – vi utforsker hvordan designere kan bidra til en mer bærekraftig og rettferdig digital fremtid. Oppdag hvordan små valg i designprosessen kan gjøre en stor forskjell for planeten vår.",
      image: "/news1.png",
    },
    {
      id: 3,
      title: "Den Økende Rollen av UX i Kundens Reise Online",
      content:
        "Brukeropplevelse (UX) er mer kritisk enn noen gang i å forme kundens reise på nettet. Fra det første klikket til det endelige kjøpet, spiller UX en nøkkelrolle i å konvertere besøkende til lojale kunder. Vi ser på hvordan bedrifter kan optimalisere sin online tilstedeværelse ved å fokusere på smidige, intuitive og engasjerende brukeropplevelser.",
      image: "/news2.png",
    },
  ];
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSuccess = () => {
    fetch(`${getApiUrl()}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
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

  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 768) {
        if (newsItems.length >= 3) {
          setSlidesToShow(3);
        } else {
          setSlidesToShow(newsItems.length);
        }
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [newsItems.length]);

  const settings = {
    infinite: newsItems.length > slidesToShow, // Aktiverer infinite bare når det er flere kort enn slidesToShow
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: newsItems.length > 1, // Aktiverer autoplay bare når det er mer enn en omtale
    autoplaySpeed: 2500,
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="news-section">
      <div className="news-section__container">
        <div className="news-section-header">
          <h2 className="news-section-title">Utforsk vår blogg</h2>
          <p className="news-section-description">
            Velkommen til vår blogg! Her kan du utforske et mangfold av emner,
            fra de siste trendene innen teknologi og vitenskap til praktiske
            tips og triks for hverdagen. Bli med oss på en reise gjennom
            inspirerende historier, dyptpløyende analyser og meningsfulle
            diskusjoner som vil utvide horisontene dine og gi deg verdifull
            innsikt.
          </p>
        </div>
        <div className="news-carousel">
          <Carousel {...settings}>
            {blogs?.map((blog: IBlog, index) => (
              <div
                key={index}
                className="news-card"
                onClick={() => {
                  window.location.href = `/blog?id=${blog.id}`;
                }}
              >
                <img
                  src={`./${blog.file_name}`}
                  alt={blog.title}
                  className="news-image"
                />
                <h3 className="news-title">{blog.title}</h3>
                <p className="news-content">{blog.description}</p>
                <button
                  className="card-button-read-more"
                  onClick={() => (window.location.href = "/blog?id=1")}
                >
                  Les mer
                </button>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
