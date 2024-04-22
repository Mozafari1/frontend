import React from "react";
import "./Privacy.scss";

const Privacy: React.FC = () => {
  return (
    <div className="privacy-us-page">
      <div className="privacy-us-banner">
        <object
          type="image/svg+xml"
          data={"./privacy.svg"}
          aria-label="banner"
        />
      </div>
      <div className="privacy-contents">
        <h2 className="privacy-title-page">Personvernerklæring for Inovix</h2>
        <p className="privacy-text-page">
          Velkommen til Inovix. Vi er forpliktet til å beskytte personvernet til
          våre brukere og kunder. Denne personvernerklæringen forklarer hvordan
          vi samler inn, bruker, og beskytter personopplysningene du deler med
          oss når du bruker vår nettside, samt dine rettigheter i forhold til
          disse opplysningene, i samsvar med Generell databeskyttelsesforordning
          (GDPR) og Norges lover og regler om databeskyttelse. Ved å bruke vår
          nettside, samtykker du til vilkårene beskrevet i denne
          personvernerklæringen.
        </p>
        <h3 className="privacy-title-page1">Informasjonssamling og Bruk</h3>
        <h4 className="privacy-subtitle">Cookies og Analyse</h4>
        <p className="privacy-text-page">
          Inovix bruker cookies og lignende teknologier for å forbedre
          brukeropplevelsen og analysere hvordan nettstedet brukes. Cookies
          hjelper oss med å forstå brukernes adferd, fortelle oss hvilke deler
          av nettstedet vårt folk har besøkt, og lette og måle effektiviteten av
          annonser og websøk. Vi bruker også cookies for å optimalisere din
          brukeropplevelse ved å huske dine preferanser og innstillinger.
        </p>
        <h4 className="privacy-subtitle">reCAPTCHA</h4>
        <p className="privacy-text-page">
          Vi implementerer reCAPTCHA på vår nettside for å forhindre spam og
          misbruk. reCAPTCHA analyserer aktiviteten din for å skille mellom
          menneskelige brukere og skadelige boter. Bruk av reCAPTCHA er
          underlagt Googles personvernregler og vilkår for bruk.
        </p>
        <h4 className="privacy-subtitle">Kontaktskjema</h4>
        <p className="privacy-text-page">
          Når du fyller ut kontaktskjemaet på vår nettside, samler vi inn
          personopplysningene du oppgir, som fullt navn, mobilnummer,
          e-postadresse, og detaljer om din henvendelse. Denne informasjonen
          brukes kun for å kunne behandle din forespørsel effektivt og tilby den
          hjelpen eller tjenestene du ber om.
        </p>
        <h4 className="privacy-subtitle">Dataproteksjon og Sikkerhet</h4>
        <p className="privacy-text-page">
          I samsvar med Generell databeskyttelsesforordning (GDPR) og Norges
          lover og regler om databeskyttelse, tar Inovix alle nødvendige
          forholdsregler for å sikre at dine personopplysninger blir behandlet
          på en sikker måte. Vi har implementert passende fysiske, tekniske, og
          administrative tiltak for å beskytte personopplysningene mot
          uautorisert tilgang, endring, offentliggjøring, eller ødeleggelse.
        </p>
        <h4 className="privacy-subtitle">Deling av Informasjon</h4>
        <p className="privacy-text-page">
          Inovix vil ikke selge, utleie, eller dele dine personopplysninger med
          tredjeparter uten ditt uttrykkelige samtykke, med mindre det kreves
          ved lov, eller som nødvendig for å levere tjenestene du ber om. Vi kan
          imidlertid dele anonymisert og aggregert informasjon med tredjeparter
          for analytiske formål, som ikke personlig identifiserer deg.
        </p>
        <h4 className="privacy-subtitle">Dine Rettigheter under GDPR</h4>
        <p className="privacy-text-page">
          I henhold til GDPR har du flere rettigheter angående behandlingen av
          dine personopplysninger, inkludert retten til å få tilgang til, rette,
          slette ("rett til å bli glemt"), eller begrense behandlingen av dine
          personopplysninger som Inovix holder. Du har også rett til å
          protestere mot behandlingen av dine personopplysninger og retten til
          dataportabilitet. For å utøve disse rettighetene, vennligst kontakt
          oss ved hjelp av kontaktinformasjonen nedenfor.
        </p>
        <h4 className="privacy-subtitle">Endringer i Personvernerklæringen</h4>
        <p className="privacy-text-page">
          Vi forbeholder oss retten til å gjøre endringer i denne
          personvernerklæringen. Den oppdaterte versjonen vil bli publisert på
          vår nettside med en oppdatert revisjonsdato. Vi oppfordrer deg til
          regelmessig å gjennomgå vår personvernerklæring for å holde deg
          informert om hvordan vi beskytter din informasjon.
        </p>
        <h4 className="privacy-subtitle">Kontakt Oss</h4>
        <p className="privacy-text-page">
          Hvis du har spørsmål eller bekymringer angående denne
          personvernerklæringen eller behandlingen av dine personopplysninger,
          vennligst kontakt oss på:
        </p>
        <p className="privacy-text-page">E-post: kontakt@inovix.no</p>
        <p className="privacy-text-page"> Telefon: +47 402 96 867</p>
        <p className="privacy-text-page">
          Din tillit er viktig for oss, og vi er forpliktet til å beskytte
          personvernet og sikkerheten til dine personopplysninger.
        </p>
      </div>
    </div>
  );
};
export default Privacy;
