import React, { useEffect, useState } from "react";
import "./css/ContactSection.scss";
import Select from "react-select";
import getApiUrl from "../../helper/helper";
import axios from "axios";
import Swal from "sweetalert2";
const initialData = {
  name: "",
  email: "",
  phone_number: "",
  service_type: "",
  message: "",
};
const ContactSection: React.FC = () => {
  const [serviceOptions, setServiceOptions] = useState([
    { value: "0", label: "Ingen tjenste..." },
  ]);

  const [state, setState] = useState(initialData);

  const handleGetServices = () => {
    const apiUrl = getApiUrl();
    if (!apiUrl) {
      return;
    }
    axios
      .get(`${apiUrl}/get-service-list`)
      .then((response) => {
        const services = response.data.map((s: any) => ({
          value: s.title,
          label: `${s.title}`,
        }));
        setServiceOptions(services);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };
  useEffect(() => {
    handleGetServices();
  }, []);

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vennligst skriv inn en gyldig e-postadresse.",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Takk for din melding!",
            text: "Vi vil kontakte deg så snart som mulig.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Noe gikk galt. Vennligst prøv igjen senere.",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      <div className="contact-section">
        <div className="tilt-shape">
          <div className="custom-shape-divider-top-1708454110">
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
        <div className="contact-form-container-main">
          <h2 className="contact-us-title">Velkommen til vårt kontaktskjema</h2>
          <p className="contact-intro">
            Har du behov for hjelp, har spørsmål eller ønsker du å diskutere et
            prosjekt? Vårt dedikerte team er her for å hjelpe deg på best mulig
            måte. Vennligst fyll ut skjemaet nedenfor, og vi vil komme tilbake
            til deg så snart som mulig.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field half-width">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Navn..."
                  value={state.name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="form-field half-width">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="E-post..."
                  value={state.email}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field half-width">
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  placeholder="Telefon...(valgfritt)"
                  onChange={handleChangeInput}
                  value={state.phone_number}
                />
              </div>
              <div className="form-field half-width">
                <Select
                  className="select-service"
                  id="service_type"
                  name="service_type"
                  options={serviceOptions}
                  placeholder="Velg Tjeneste..."
                  value={
                    serviceOptions.find(
                      (option) => option.value === state.service_type
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    setState({
                      ...state,
                      service_type: selectedOption?.value || "",
                    })
                  }
                  isClearable
                />
              </div>
            </div>
            <div className="message-area">
              <textarea
                id="message"
                name="message"
                required
                placeholder="Melding..."
                onChange={handleChangeTextArea}
                value={state.message}
              />
            </div>
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
        </div>
      </div>
    </>
  );
};

export default ContactSection;
