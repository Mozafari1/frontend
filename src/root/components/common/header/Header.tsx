import React, { useState } from "react";
import "./Header.scss";

interface IProps {
  imgSrc: string;
}

const Header: React.FC<IProps> = ({ imgSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={imgSrc} alt="" />
          </a>
        </div>
        <nav className={`header__nav ${isOpen ? "header__nav--visible" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="/service">Tjenester</a>
            </li>
            <li>
              <a href="/price">Priser</a>
            </li>
            <li>
              <a href="/about-us">Om Oss</a>
            </li>

            <li className="contact-button">
              <a href="/contact-us">
                Kontakt <i className="fa-solid fa-arrow-right icons-right" />
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`header__toggle ${isOpen ? "open" : ""}`}
          onClick={toggleNavbar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
