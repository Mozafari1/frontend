import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentComponent: React.FC = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Jeg aksepterer"
      cookieName="mySiteCookieConsent"
      expires={150}
      style={{
        position: "fixed",
        bottom: "0", // Plasserer nederst
        display: "flex", // Bruker flexbox for layout
        alignItems: "center", // Senterer barn horisontalt
        justifyContent: "center", // Senterer barn vertikalt
        width: "auto", // Automatisk bredde basert på innhold
        background: "#fff",
        height: "auto", // Automatisk høyde basert på innhold
        color: "#003366",
        textAlign: "center",
        padding: "20px",
        fontSize: "16px",
        borderRadius: "22px 22px 0 0", // Litt avrundede hjørner for estetikk
        boxShadow: "0 16px 24px rgba(0,0,0,5)", // Skygge for dybde
      }}
      buttonStyle={{
        color: "#ffffff",
        background: "#1e90ff",
        padding: "10px 30px",
        fontSize: "14px",
        borderRadius: "22px",
        border: "1px solid #1e90ff",
        transition: "background 0.3s ease-in-out",
      }}
    >
      Denne nettsiden bruker cookies for å forbedre brukeropplevelsen. {/*  */}
    </CookieConsent>
  );
};

export default CookieConsentComponent;
