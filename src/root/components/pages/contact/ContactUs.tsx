import React, { useState } from "react";
import "./css/ContactUsAnimation.scss";
import "./css/ContactUs.scss";
import getApiUrl from "../../helper/helper";
import axios from "axios";
const ContactUs = () => {
  const initialData = {
    name: "",
    email: "",
    phone_number: "",
    message: "",
  };

  const [state, setState] = useState(initialData);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      alert("Ugyldig e-postadresse");
      return;
    }
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      return;
    }
    axios
      .post(`${apiUrl}/create-inbox`, state)
      .then((response) => {
        if (response.status === 201) {
          setState(initialData);
        }
      })
      .catch((error) => {
        console.error("Error inserting contact:", error);
      });
  };

  return (
    <div className="contact-us-page">
      <div className="background">
        <div className="box">
          <div className="spin-container">
            <div className="shape"></div>
          </div>
        </div>
        <div className="small-box">
          <div className="small-spin-container">
            <div className="small-shape"></div>
          </div>
        </div>
      </div>
      <div className="contact-page-container">
        <div className="contact-card">
          <div className="card-content">
            <div className="image-left">
              <img src="/post.svg" alt="Kontakt oss illustrasjon" />
            </div>
            <div className="form-right">
              <div className="welcome-message">
                <h2>Ta kontakt med oss</h2>
                <p>
                  Har du spørsmål eller trenger du hjelp? Fyll ut skjemaet, så
                  tar vi kontakt så snart som mulig!
                </p>
              </div>
              <form className="contact-form-page" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Navn..."
                  value={state.name}
                  onChange={handleChangeInput}
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="E-post..."
                  value={state.email}
                  onChange={handleChangeInput}
                />
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Telefon (valgfritt)"
                  value={state.phone_number}
                  onChange={handleChangeInput}
                />

                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Melding..."
                  value={state.message}
                  onChange={handleChangeTextArea}
                />
                <a href="/privacy" className="privacy-link">
                  Ved innsending aksepterer du våre personvern.
                </a>

                <div className="form-submit">
                  <button type="submit">
                    <i className="fa-regular fa-paper-plane icons-left" />
                    Send Melding
                  </button>
                </div>
              </form>
              <div className="optional-contact">
                <div className="or">Eller</div>
                <p>
                  Kontakt oss direkte på telefon eller e-post, så hjelper vi deg
                </p>
                <div className="contact-details">
                  <a href="tel:+4740296867" className="contact-us">
                    <i className="fa-solid fa-phone icons-left" />
                    +47 402 96 867
                  </a>
                  <a href="mailto:kontakt@inovix.no" className="contact-us">
                    <i className="fa-regular fa-envelope icons-left" />
                    kontakt@inovix.no
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
