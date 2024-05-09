import React, { useState } from "react";
import "./css/Feedback.scss";
import getApiUrl from "../../helper/helper";
import axios from "axios";
import Swal from "sweetalert2";

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = window.location.href;
      const apiUrl = getApiUrl();
      if (!url) {
        return;
      }

      await axios
        .put(`${apiUrl}/feedback-from-token`, formData, {
          headers: {
            Authorization: `Bearer ${url}`,
          },
        })
        .then((response) => {
          setFormData({
            name: "",
            role: "",
            feedback: "",
          });

          window.location.href = "/";
          Swal.fire({
            icon: "success",
            title: "Takk for din tilbakemelding",
            text: "Vi setter stor pris på din tilbakemelding og tar den med i betraktning for å forbedre våre tjenester. Takk for at du delte dine tanker med oss!",
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((error) => {
          console.error("Error sending feedback:", error);
        });
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-card">
          <div className="header">
            <div className="title">Takk for din tilbakemelding</div>
            <p className="message">
              Vi setter stor pris på din tilbakemelding og tar den med i
              betraktning for å forbedre våre tjenester. Takk for at du delte
              dine tanker med oss!
            </p>
          </div>
          <form className="form-feedback" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="atom-required">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Navn... eks. Ola Nordmann"
                required
                maxLength={100}
                onChange={handleInputChange}
                defaultValue={formData.name}
              />
            </div>
            <div>
              <label htmlFor="role" className="atom-required">
                Rolle
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Rolle... eks. Eier av selskapet"
                required
                maxLength={100}
                onChange={handleInputChange}
                defaultValue={formData.role}
              />
            </div>
            <div>
              <label htmlFor="feedback" className="atom-required">
                Tilbakemelding
              </label>
              <textarea
                id="feedback"
                name="feedback"
                required
                placeholder="Tilbakemelding..."
                maxLength={1000}
                onChange={handleInputChange}
                defaultValue={formData.feedback}
              />
            </div>
            <button type="submit">
              <i className="fa-regular fa-paper-plane icons-left" />
              Send
            </button>
          </form>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 800 800"
          width="100%" // Adjust the width as needed
          height="100%" // Adjust the height as needed
          style={{ position: "absolute", top: 50, left: 0 }}
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="cccoil-grad"
            >
              <stop
                stopColor="hsl(206, 75%, 49%)"
                stopOpacity="1"
                offset="0%"
              ></stop>
              <stop
                stopColor="hsl(331, 90%, 56%)"
                stopOpacity="1"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <g stroke="url(#cccoil-grad)" fill="none" strokeLinecap="round">
            <circle
              r="306"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="1480 1923"
              transform="rotate(360, 400, 400)"
              opacity="0.49"
            ></circle>
            <circle
              r="289"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="1316 1816"
              transform="rotate(339, 400, 400)"
              opacity="0.81"
            ></circle>
            <circle
              r="272"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="1161 1709"
              transform="rotate(318, 400, 400)"
              opacity="0.88"
            ></circle>
            <circle
              r="255"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="1016 1602"
              transform="rotate(296, 400, 400)"
              opacity="0.24"
            ></circle>
            <circle
              r="238"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="881 1495"
              transform="rotate(275, 400, 400)"
              opacity="0.74"
            ></circle>
            <circle
              r="221"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="755 1389"
              transform="rotate(254, 400, 400)"
              opacity="0.72"
            ></circle>
            <circle
              r="204"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="639 1282"
              transform="rotate(233, 400, 400)"
              opacity="0.85"
            ></circle>
            <circle
              r="187"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="532 1175"
              transform="rotate(212, 400, 400)"
              opacity="0.73"
            ></circle>
            <circle
              r="170"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="435 1068"
              transform="rotate(191, 400, 400)"
              opacity="0.77"
            ></circle>
            <circle
              r="153"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="348 961"
              transform="rotate(169, 400, 400)"
              opacity="0.21"
            ></circle>
            <circle
              r="136"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="271 855"
              transform="rotate(148, 400, 400)"
              opacity="0.22"
            ></circle>
            <circle
              r="119"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="203 748"
              transform="rotate(127, 400, 400)"
              opacity="0.24"
            ></circle>
            <circle
              r="102"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="145 641"
              transform="rotate(106, 400, 400)"
              opacity="0.77"
            ></circle>
            <circle
              r="85"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="97 534"
              transform="rotate(85, 400, 400)"
              opacity="0.31"
            ></circle>
            <circle
              r="68"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="58 427"
              transform="rotate(64, 400, 400)"
              opacity="0.61"
            ></circle>
            <circle
              r="51"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="29 320"
              transform="rotate(42, 400, 400)"
              opacity="0.10"
            ></circle>
            <circle
              r="34"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="10 214"
              transform="rotate(21, 400, 400)"
              opacity="0.68"
            ></circle>
            <circle
              r="17"
              cx="400"
              cy="400"
              strokeWidth="4"
              strokeDasharray="0 107"
              opacity="0.95"
            ></circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Feedback;
