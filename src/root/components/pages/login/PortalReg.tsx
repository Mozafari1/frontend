import React, { useState } from "react";
import "./css/PortalReg.scss";
import axios from "axios";
import getApiUrl from "../../helper/helper";

const PortalReg: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Sjekk om alle feltene er fylt ut
    const { first_name, last_name, email, password, code } = formData;
    if (!first_name || !last_name || !email || !password || !code) {
      alert("Vennligst fyll ut alle feltene");
      return;
    }

    // Sjekk om e-posten har riktig format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Vennligst oppgi en gyldig e-postadresse");
      return;
    }

    // Sjekk om passordet er langt nok og inneholder minst en stor bokstav, en liten bokstav og et tall og et spesialtegn
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Passordet må være minst 8 tegn langt og inneholde minst en stor bokstav, en liten bokstav, et tall og et spesialtegn"
      );
      return;
    }

    try {
      // Kall API-et for å opprette en ny bruker
      const response = await axios.post(
        `${getApiUrl()}/users-create`,
        formData
      );
      // Tilbakestill skjemaet
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        code: "",
      });
      if (response.status === 201) {
        window.location.href = "/portallogin";
      }
    } catch (error) {
      // Hvis det oppstår en feil, vis feilmeldingen til brukeren
      alert(
        "Det oppstod en feil ved oppretting av brukeren. Prøv igjen senere."
      );
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="portal-reg">
      <div className="portal-reg-container">
        <div className="card-reg">
          <h2 className="portal-reg-title">Registrer deg</h2>
          <form className="portal-reg-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="first_name"
              required
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Fornavn"
            />

            <input
              type="text"
              id="last_name"
              required
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Etternavn"
            />

            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="E-post..."
            />

            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Passord..."
            />

            <input
              type="text"
              className="code-input"
              id="code"
              name="code"
              required
              value={formData.code}
              onChange={handleChange}
              placeholder="Kode..."
            />
            <div className="form-submit">
              <button type="submit">Registrer deg</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalReg;
