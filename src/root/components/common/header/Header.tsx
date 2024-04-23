import React, { useState } from "react";
import "./Header.scss";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const url = window.location.href;
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={"./logo.png"} alt="" />
          </a>
        </div>
        <nav className={`header__nav ${isOpen ? "header__nav--visible" : ""}`}>
          <ul className="nav-links">
            <li className={url.includes("/service") ? "active-link" : ""}>
              <a href="/service">Tjenester</a>
            </li>
            <li className={url.includes("/price") ? "active-link" : ""}>
              <a href="/price">Priser</a>
            </li>
            <li className={url.includes("/about-us") ? "active-link" : ""}>
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
