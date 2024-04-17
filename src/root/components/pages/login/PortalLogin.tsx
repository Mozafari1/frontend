import React, { useState } from "react";
import "./css/PortalLogin.scss";
import getApiUrl from "../../helper/helper";
import { useNavigate } from "react-router-dom";

const PortalLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Vennligst oppgi en gyldig e-postadresse");
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/users-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError("Feil ved innlogging. Vennligst prøv igjen.");
      }
    } catch (error) {
      setError("Noe gikk galt. Vennligst prøv igjen senere.");
    }
  };

  return (
    <div className="portal-login">
      <div className="portal-login-container">
        <div className="card-login">
          <h2 className="portal-login-title">Logg inn</h2>
          <form className="portal-login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="E-post"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Passord"
            />
            <div className="form-submit">
              <button type="submit">Logg inn</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortalLogin;
