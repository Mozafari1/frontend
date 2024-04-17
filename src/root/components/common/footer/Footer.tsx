import React from "react";
import "./Footer.scss";

interface IProps {
  imgSrc: string;
}
const Footer: React.FC<IProps> = ({ imgSrc }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <svg
        className="footer-wave"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="bg">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(130, 158, 249, 0.06)" }}
            ></stop>
            <stop
              offset="50%"
              style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: "rgba(76, 190, 255, 0.6)" }}
            ></stop>
          </linearGradient>
          <path
            id="wave"
            fill="url(#bg)"
            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
          />
        </defs>
        <g>
          <use href="#wave" opacity=".3">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use href="#wave" opacity=".6">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
          <use href="#wave" opacity=".9">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <img
              className="footer-logo"
              src={imgSrc}
              alt=""
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </div>
          <div className="footer-section">
            <p>
              <a href="mailto:kontakt@inovix.no">
                <i className="fa-regular fa-envelope icons-left" />
                kontakt@inovix.no
              </a>
            </p>

            <p>
              <i className="fa-solid fa-phone icons-left" />
              +47 402 96 867
            </p>
          </div>
          <div className="footer-section">
            <a href="/privacy">Personvernerklæring</a>
          </div>
          <div className="footer-section">
            <div className="social-links">
              <i className="fa-brands fa-facebook-f" />
              <i className="fa-brands fa-instagram" />
              <i className="fa-brands fa-tiktok" />
              <i className="fa-brands fa-x-twitter" />
              <i className="fa-brands fa-linkedin" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          &copy; {currentYear} Inovix AS. Alle rettigheter reservert
        </div>
      </div>
    </footer>
  );
};

export default Footer;
