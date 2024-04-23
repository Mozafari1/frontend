import React, { useState } from "react";
import "./css/ServicePageCards.scss";
import { IService } from "./ServicePage";
import getApiUrl from "../../helper/helper";
interface IProps {
  data: IService[];
}
const ServicePageCards: React.FC<IProps> = ({ data }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cards = [
    {
      image: "/web.svg",
      title: "Nettside Design og Utvikling",
      lessContent:
        "I dagens digitale tidsalder er en profesjonell nettside ditt viktigste markedsføringsverktøy. Hos Inovix skreddersyr vi design og utvikling av nettsider for å reflektere din merkevareidentitet og engasjere målgruppen din. Våre løsninger er ikke bare visuelt tiltalende, men også optimalisert for brukervennlighet, tilgjengelighet og søkemotorer, sikrer at din bedrift utmerker seg og oppnår optimal online synlighet.",
      mainContent:
        "Nettside design og utvikling er kunsten og vitenskapen bak skapingen av digitale plattformer som ikke bare ser estetisk tiltalende ut, men som også fungerer feilfritt på tvers av forskjellige enheter og nettlesere. Dette omfatter alt fra layout og grafisk design til innhold og brukeropplevelse (UX), samt den tekniske konstruksjonen som holder siden kjørende, som backend-logikk og databasetilkoblinger.",
      subContentTitle1: "Betydningen for Din Bedrift",
      subContent1:
        "I en verden som stadig blir mer digital, er din nettside ofte det første møtepunktet mellom din bedrift og potensielle kunder. En godt utformet og funksjonell nettside bygger troverdighet, forsterker din merkevareidentitet, og gjør det mulig for kunder å oppdage hva du tilbyr. Den kan fungere som et kraftfullt salgsverktøy, informasjonskilde, og kommunikasjonsplattform, noe som gjør den uvurderlig for din virksomhets vekst og suksess.",
      subContentTitle2: "Viktige Elementer i Nettside",

      subContentTitlePoint1: "Brukervennlighet",
      subContentPoint1:
        "En intuitiv og lett navigerbar nettside sikrer en positiv brukeropplevelse som holder besøkende engasjerte og reduserer fluktraten.",
      subContentTitlePoint2: "Responsivt Design",
      subContentPoint2:
        "Med et økende antall brukere som aksesserer nettet via mobiltelefoner, er det essensielt at din nettside fungerer sømløst på alle enheter og skjermstørrelser.",
      subContentTitlePoint3: "Optimalisering for Søkemotorer (SEO)",
      subContentPoint3:
        "En nettside som er optimalisert for søkemotorer, øker sjansen for å bli funnet av potensielle kunder gjennom organiske søk.",
      subContentTitlePoint4: "Hastighet og Ytelse",
      subContentPoint4:
        "En rask nettside forbedrer brukeropplevelsen og bidrar positivt til søkemotorrangeringer.",
      subContentTitlePoint5: "Sikkerhet",
      subContentPoint5:
        "Sikkerhetsaspekter som HTTPS, datakryptering og sikkerhetskopiering er avgjørende for å beskytte både brukernes og bedriftens data.",
      subContentTitle3: "Hvordan Inovix Kan Hjelpe",
      subContent3:
        "Ved Inovix tar vi en helhetlig tilnærming til nettside design og utvikling. Vårt team av erfarne designere og utviklere jobber tett med deg for å forstå dine unike behov og mål. Vi kombinerer estetisk design med funksjonalitet for å skape skreddersydde nettsider som ikke bare representerer din merkevare på best mulig måte, men som også engasjerer og konverterer besøkende til kunder.",

      subContent4:
        "Vi benytter de nyeste teknologiene og beste praksisene for å sikre at din nettside er rask, sikker og mobilvennlig. Vår SEO-ekspertise sikrer at din nettside er synlig i søkemotorer, og vår kontinuerlige støtte og vedlikeholdstjenester sørger for at din nettside forblir oppdatert med de siste trender og teknologier.",

      subContent5:
        "Å investere i profesjonell nettside design og utvikling er ikke bare et kostnadselement; det er en investering i din virksomhets fremtid. Hos Inovix forstår vi viktigheten av denne investeringen og er dedikerte til å levere løsninger som ikke bare møter, men overgår dine forventninger. La oss hjelpe deg med å bygge en nettside som er skreddersydd for din suksess.",
    },

    {
      image: "/app.svg",
      title: "Mobil App Utvikling",
      lessContent:
        "Med den stadig økende bruken av smarttelefoner, er mobilapper blitt en essensiell plattform for å nå ut til kunder. Vi i Inovix utvikler intuitive, innovative og brukervennlige mobilapplikasjoner for både iOS og Android, som ikke bare møter, men overgår kundenes forventninger, og gir dem en sømløs og engasjerende brukeropplevelse.",
      mainContent:
        "Mobil app utvikling refererer til prosessen med å skape programvare som kjører på mobile enheter, som smarttelefoner og nettbrett. Denne prosessen omfatter design, koding, testing og implementering av applikasjoner som tilbyr brukervennlige løsninger til både hverdagslige og spesialiserte behov. I en tid der mobilitet og umiddelbar tilgang til informasjon er avgjørende, representerer mobilapper en vital forlengelse av din virksomhets tjenester og merkevare.",

      subContentTitle1:
        "Hvorfor Mobil App Utvikling er Kritisk for Din Bedrift",
      subContent1:
        "Mobilapper tilbyr en direkte kanal til dine kunder, gir verdifull innsikt i deres preferanser og atferd, og muliggjør personlig kommunikasjon. De styrker kundelojalitet gjennom forbedret kundeopplevelse og engasjement. For bedrifter representerer mobilapper en unik mulighet til å stå ut i markedet, øke tilgjengeligheten av deres produkter eller tjenester, og dermed drive vekst.",

      subContentTitle2: "Viktige Aspekter ved Mobil App Utvikling",

      subContentTitlePoint1: "Plattformvalg",
      subContentPoint1:
        "Å velge riktig plattform (iOS, Android eller begge) er avgjørende basert på din målgruppe og deres enhetspreferanser.",
      subContentTitlePoint2: "Brukeropplevelse (UX)",
      subContentPoint2:
        "En intuitiv og engasjerende brukeropplevelse er nøkkelen til appens suksess. Appens design og brukervennlighet bør prioriteres for å sikre enkel navigering og tilfredsstillende interaksjoner.",
      subContentTitlePoint3: "Ytelse og Sikkerhet",
      subContentPoint3:
        "Appen må være rask, responsiv og sikker, beskytte brukerdata og tilby en sømløs opplevelse selv under høy belastning.",
      subContentTitlePoint4: "Vedlikehold og Oppdateringer",
      subContentPoint4:
        "Regelmessig vedlikehold og oppdateringer er nødvendig for å holde appen relevant, sikker og i tråd med brukernes forventninger og teknologiske trender.",

      subContentTitle3: "Hvordan Inovix Fremmer Din Mobilappstrategi",
      subContent3:
        "Inovix tilbyr omfattende mobil app utviklingstjenester som dekker hele spekteret fra ide til lansering og videre. Vårt team av eksperter forstår viktigheten av å skape en app som ikke bare ser bra ut, men som også løser reelle problemer for dine brukere. Vi arbeider tett med deg for å forstå dine spesifikke behov og mål, og bruker denne innsikten til å skape skreddersydde, innovative apper som engasjerer og beholder brukere.",

      subContent4:
        "Vi fokuserer på å utvikle mobilapper som er optimalisert for ulike plattformer og enheter, sikrer høy ytelse, og tar sikkerhet på alvor fra starten. Vårt mål er å levere mobilapper som ikke bare oppfyller, men overgår dine forventninger, og hjelper din bedrift med å oppnå målbare resultater.",

      subContent5:
        "Mobil app utvikling er ikke lenger en luksus, men en nødvendighet for bedrifter som ønsker å holde tritt med den digitale tidsalderen. Med Inovix som din partner, kan du være sikker på at din mobilapp vil bli utviklet med den største omsorg, ekspertise, og fokus på å drive din forretningsvekst. La oss hjelpe deg med å transformere din digitale tilstedeværelse med en kraftfull, brukervennlig og målrettet mobilapp.",
    },
    {
      image: "/shop.svg",
      title: "Nettbutikk Utvikling",
      lessContent:
        "E-handel er nøkkelen til suksess for mange bedrifter i dag. Våre e-handelsløsninger tilbyr en komplett pakke fra butikkdesign til betalingsløsninger, som er skreddersydd for å drive salg og forbedre kundeopplevelsen. Vi integrerer de nyeste teknologiene for å sikre sikre transaksjoner, enkel navigering og maksimal konvertering.",
      mainContent:
        "Nettbutikk utvikling er prosessen med å skape en digital handelsplattform som muliggjør kjøp og salg av produkter eller tjenester over internett. Den omfatter alt fra brukergrensesnitt design, produktkatalogadministrasjon, handlekurvfunksjonalitet, til betalingsgateway integrasjoner. En velutviklet nettbutikk er avgjørende for å tilby en sømløs, sikker og tiltalende shoppingopplevelse for kundene.",
      subContentTitle1: "Viktigheten av Nettbutikk for Din Virksomhet",
      subContent1:
        "I en tid der e-handel dominerer detaljhandelen, er en nettbutikk essensiell for å nå ut til et bredere publikum og kapitalisere på online salgsmuligheter. En effektiv nettbutikk kan utvide ditt marked, øke salget, og styrke din merkevare, samtidig som den tilbyr kundene bekvemmelighet og tilgjengelighet 24/7.",
      subContentTitle2: "Kjerneelementer i Nettbutikk Utvikling",
      subContentTitlePoint1: "Brukervennlig Design",
      subContentPoint1:
        "En intuitiv og attraktiv nettbutikkdesign forbedrer kundeopplevelsen og fremmer konverteringer.",
      subContentTitlePoint2: "Mobiltilpasning",
      subContentPoint2:
        "Med en stadig økende andel mobilbrukere, er det avgjørende at nettbutikken er optimalisert for mobile enheter.",
      subContentTitlePoint3: "Produkt- og Lagerstyring",
      subContentPoint3:
        "Effektiv administrasjon av produktkataloger og lagerbeholdning sikrer at kundene alltid har tilgang til oppdatert og nøyaktig produktinformasjon.",
      subContentTitlePoint4: "Sikre Betalingsløsninger",
      subContentPoint4:
        "Integrering av pålitelige betalingsgatewayer gir kundene trygghet når de utfører transaksjoner.",
      subContentTitlePoint5: "SEO og Markedsføring",
      subContentPoint5:
        "Søkemotoroptimalisering og integrerte markedsføringsverktøy er essensielle for å tiltrekke seg trafikk og fremme salg.",
      subContentTitle3: "Hvordan Inovix Revolusjonerer Din Nettbutikke",
      subContent3:
        "Inovix tilbyr skreddersydde e-handelsløsninger som kombinerer estetisk design med funksjonalitet for å skape engasjerende og effektive nettbutikker. Vi forstår at hver virksomhet har unike behov, og vårt team av erfarne utviklere og designere arbeider tett med deg for å realisere din visjon.",
      subContent4:
        "Vår tilnærming inkluderer utvikling av responsive nettbutikker som sikrer en sømløs shoppingopplevelse på alle enheter, integrering av sikre betalingsløsninger for å bygge tillit hos kundene, og implementering av robuste produkt- og lagerstyringssystemer for å effektivisere driftsprosesser. Videre, vårt fokus på SEO og digital markedsføring sikrer at din nettbutikk tiltrekker seg kvalitetstrafikk og oppnår høyere konverteringsrater.",

      subContent5:
        "Nettbutikk utvikling er en kritisk komponent i moderne forretningsstrategier, som muliggjør vekst og suksess i den digitale økonomien. Med Inovix som din partner, kan du være trygg på at din nettbutikk vil bli utformet med den største oppmerksomheten til detaljer, fra brukeropplevelse til backend-løsninger, alt for å sikre at din virksomhet ikke bare overlever, men blomstrer i e-handelslandskapet. La oss transformere din digitale handelsvisjon til virkelighet.",
    },
    {
      image: "/maintain.svg",
      title: "Drift og Vedlikehold",
      lessContent:
        "Å sikre at dine digitale ressurser fungerer optimalt er avgjørende for suksessen til din online tilstedeværelse. Våre drifts- og vedlikeholdstjenester inkluderer kontinuerlig overvåking, regelmessig oppdatering og proaktiv feilretting, slik at din nettside og applikasjoner alltid er pålitelige, sikre og oppdaterte.",
      mainContent:
        "Drift og vedlikehold av digitale løsninger omfatter alle aktiviteter nødvendig for å sikre at nettsider, nettbutikker, og mobilapplikasjoner fungerer optimalt over tid. Dette inkluderer regelmessige oppdateringer, feilretting, ytelsesoptimalisering, sikkerhetskontroller, og databackup. Effektiv drift og vedlikehold er avgjørende for å opprettholde funksjonalitet, sikkerhet, og brukertilfredshet.",
      subContentTitle1:
        "Betydningen av Drift og Vedlikehold for Din Virksomhet",
      subContent1:
        "I et digitalt økosystem hvor teknologier raskt utvikler seg, og brukernes forventninger stadig øker, er kontinuerlig drift og vedlikehold nødvendig for å holde tritt med endringer og sikre en konkurransedyktig tilstedeværelse. Det beskytter også mot sikkerhetstrusler, reduserer nedetid, og sikrer at digitale ressurser forblir relevante og effektive.",
      subContentTitle2: "Kjerneelementer i Drift og Vedlikehold",
      subContentTitlePoint1: "Regelmessige Oppdateringer",
      subContentPoint1:
        "Oppdatering av programvare, plugins og systemer for å sikre kompatibilitet og funksjonalitet.",
      subContentTitlePoint2: "Feilretting",
      subContentPoint2:
        "Rask identifisering og retting av bugs og feil for å opprettholde en sømløs brukeropplevelse.",
      subContentTitlePoint3: "Ytelsesoptimalisering",
      subContentPoint3:
        "Overvåking og forbedring av lastetider og responsivitet for å møte brukernes forventninger.",
      subContentTitlePoint4: "Sikkerhetsovervåking",
      subContentPoint4:
        "Implementering av sikkerhetstiltak og kontinuerlig overvåking for å beskytte mot cybertrusler.",
      subContentTitlePoint5: "Backup og Gjenoppretting",
      subContentPoint5:
        "Regelmessig sikkerhetskopiering av data for å forhindre tap og sikre rask gjenoppretting i tilfelle feil.",
      subContentTitle3: "Hvordan Inovix Forsterker Din Digitale Plattform",
      subContent3:
        "Inovix tilbyr omfattende tjenester for drift og vedlikehold som sikrer at dine digitale plattformer forblir pålitelige, sikre, og på forkant med teknologiske trender. Vårt team av tekniske eksperter forstår viktigheten av kontinuitet og ytelse i den digitale verden.",
      subContent4:
        "Vi tilbyr proaktiv overvåking for å identifisere og rette opp i potensielle problemer før de påvirker din virksomhet, ytelsesoptimalisering for å sikre rask og effektiv funksjonalitet, og sikkerhetsstrategier som beskytter mot de nyeste truslene. Med Inovix' drift og vedlikeholdstjenester, kan du fokusere på din kjernevirksomhet mens vi tar hånd om den tekniske siden.",
      subContent5:
        "I en tid preget av rask digital utvikling, er pålitelig drift og vedlikehold ikke bare en teknisk nødvendighet, men en strategisk investering i din virksomhets fremtid. Med Inovix som din partner i drift og vedlikehold, sikrer du at dine digitale ressurser ikke bare overlever, men trives i det dynamiske digitale landskapet. La oss ta ansvar for den tekniske tyngden, slik at du kan konsentrere deg om å vokse og utvide din virksomhet.",
    },
    {
      image: "/digital-2.svg",
      title: "Digital Markedsføring",
      lessContent:
        "I en verden hvor digital tilstedeværelse er avgjørende, tilbyr vi omfattende digital markedsføringstjenester, inkludert søkemotoroptimalisering (SEO), betalt annonsering (PPC), innholdsmarkedsføring, og sosiale medier strategier for å bygge merkevarebevissthet, engasjere publikum og drive konverteringer.",
      mainContent:
        "Digital markedsføring omfatter alle markedsføringsinnsatser som bruker elektroniske enheter eller internett. Det inkluderer en rekke kanaler som søkemotorer, sosiale medier, e-post, og andre nettsteder for å koble til nåværende og potensielle kunder. I en verden hvor digital tilstedeværelse er avgjørende, er digital markedsføring nøkkelen til å øke merkevarebevissthet, engasjere målgrupper, og drive konverteringer.",
      subContentTitle1:
        "Betydningen av Digital Markedsføring for Din Virksomhet",
      subContent1:
        "Digital markedsføring gjør det mulig for bedrifter av alle størrelser å nå ut til et bredere publikum på en kostnadseffektiv og målbar måte. Det gir verdifull innsikt i målgruppens adferd og preferanser, og tillater for tilpasset kommunikasjon og presis målretting. I en tid der forbrukere tilbringer stadig mer tid på nett, er en strategisk tilnærming til digital markedsføring kritisk for å bygge relasjoner, generere leads og øke salget.",
      subContentTitle2: "Kjerneelementer i Digital Markedsføring",
      subContentTitlePoint1: "Søkemotoroptimalisering (SEO)",
      subContentPoint1:
        "Forbedring av nettsidens synlighet i søkemotorresultater for å tiltrekke organisk trafikk.",
      subContentTitlePoint2: "Innholdsmarkedsføring",
      subContentPoint2:
        "Utvikling og distribusjon av verdifullt, relevant og konsistent innhold for å tiltrekke og engasjere en klart definert målgruppe.",
      subContentTitlePoint3: "Sosiale Medier Markedsføring",
      subContentPoint3:
        "Bruk av sosiale medieplattformer for å fremme merkevarer, produkter og tjenester, samtidig som man engasjerer med målgruppen.",
      subContentTitlePoint4: "E-postmarkedsføring",
      subContentPoint4:
        "Direkte markedsføring til en målrettet gruppe av mottakere gjennom e-post, som fremmer kundelojalitet og gjentatte kjøp.",
      subContentTitlePoint5: "Pay-Per-Click (PPC) Reklame",
      subContentPoint5:
        "En modell der annonsører betaler en avgift hver gang en av deres annonser blir klikket på, ofte brukt i søkemotorannonsering.",
      subContentTitle3:
        "Hvordan Inovix Transformerer Din Digital Markedsføringsstrategi",
      subContent3:
        "Inovix tilbyr en integrert tilnærming til digital markedsføring, som sikrer at din virksomhet ikke bare blir sett, men også hørt i det digitale landskapet. Vårt team av digital markedsføringseksperter utvikler og implementerer skreddersydde strategier som er i tråd med dine forretningsmål og målgruppebehov.",
      subContent4:
        "Vi benytter data-drevne innsikter for å optimalisere kampanjer og maksimere ROI, fra SEO for å forbedre din organiske søkeposisjon, til målrettet innholdsmarkedsføring og sosiale medier kampanjer som engasjerer og konverterer. Vår e-postmarkedsføring og PPC-reklame er nøye utformet for å bygge varige kunderelasjoner og drive umiddelbar trafikk og salg.",
      subContent5:
        "Digital markedsføring er ikke lenger et valg, men en nødvendighet for virksomheter som ønsker å overleve og blomstre i den digitale økonomien. Med Inovix som din digital markedsføringspartner, får du tilgang til ekspertise og teknologier som sikrer at din merkevare ikke bare navigerer, men dominerer det digitale landskapet. La oss hjelpe deg med å omdanne din digitale tilstedeværelse til din største ressurs for vekst og innovasjon.",
    },
    {
      image: "/logo.svg",
      title: "Logo og Branding",
      lessContent:
        "Din merkevareidentitet starter med en sterk visuell representasjon. Vår logo og branding service er fokusert på å skape et unikt og minneverdig merkevarebilde som resonnerer med din målgruppe, skiller deg ut fra konkurrentene og forteller din merkevarehistorie på en overbevisende måte.",
      mainContent:
        "Logo og branding er kritiske elementer i en virksomhets identitet og kommunikasjonsstrategi. En logo fungerer som et umiddelbart gjenkjennelig symbol for merkevaren, mens branding representerer de samlede verdiene, tonen, opplevelsen og forventningene knyttet til et selskap eller produkt. Sammen danner de fundamentet for hvordan en virksomhet oppfattes av både eksisterende og potensielle kunder.",
      subContentTitle1: "Betydningen av Logo og Branding for Din Virksomhet",
      subContent1:
        "Effektiv logo og branding kan skille din virksomhet fra konkurrentene, bygge kundetillit og lojalitet, og kommunisere din virksomhets verdier og visjon. En sterk merkevareidentitet tiltrekker seg ikke bare målgruppen, men bidrar også til å beholde den ved å skape en følelsesmessig forbindelse og gjenkjennelse.",
      subContentTitle2: "Kjerneelementer i Effektiv Logo og Branding",
      subContentTitlePoint1: "Unikhet",
      subContentPoint1:
        "Din logo og merkevarestil bør skille seg ut i markedet, og tydelig reflektere din virksomhets unike karakter og verdier.",
      subContentTitlePoint2: "Konsistens",
      subContentPoint2:
        "Branding bør være konsistent over alle plattformer og berøringspunkter med kunden, fra nettsiden til markedsføringsmateriell og sosiale medier.",
      subContentTitlePoint3: "Gjenkjennelighet",
      subContentPoint3:
        "En god logo bør være lett gjenkjennelig, minneverdig og funksjonell på tvers av ulike medier og skalaer.",
      subContentTitlePoint4: "Tilknytning",
      subContentPoint4:
        "Din branding bør resonere med din målgruppe, skape en emosjonell forbindelse og kommunisere bedriftens verdier og løfter.",

      subContentTitle3: "Hvordan Inovix Fremmer Din Merkevarebygging",
      subContent3:
        "Inovix tilbyr omfattende logo- og brandingtjenester som er skreddersydd for å reflektere essensen av din virksomhet og appellere til din målgruppe. Vårt team av kreative designere og merkevarestrateger dykker dypt inn i din virksomhets historie, verdier og ambisjoner for å skape en unik og meningsfull merkevareidentitet.",
      subContent4:
        "Vi utvikler logoer som ikke bare er estetisk tiltalende, men som også kommuniserer din virksomhets kjernebudskap på et øyeblikk. Videre sikrer vår helhetlige tilnærming til branding at din merkevareidentitet er konsistent og effektiv over alle kanaler og berøringspunkter, fra digitalt til trykk, for å maksimere merkevaregjenkjennelsen og lojaliteten.",
      subContent5:
        "Logo og branding er mer enn bare grafisk design; de er essensielle instrumenter for å bygge og formidle din virksomhets identitet og verdier. Med Inovix som din partner i logo- og merkevarebygging, kan du være trygg på at din virksomhet vil bli presentert med en distinkt og kraftfull merkevareidentitet som engasjerer målgruppen og skiller deg ut i markedet. La oss hjelpe deg med å skape en merkevare som ikke bare representerer din virksomhet, men også inspirerer og tiltrekker kunder.",
    },
    {
      image: "/api-2.svg",
      title: "API Utvikling og Integrasjon",
      lessContent:
        "I en stadig mer sammenkoblet digital verden, er API-er kritiske for å skape sømløse integrasjoner mellom ulike systemer og tjenester. Vår ekspertise i API-utvikling og integrasjon sikrer at dine applikasjoner og tjenester kan kommunisere effektivt, forbedre operasjonell effektivitet og tilby utvidede funksjoner til dine brukere.",
      mainContent:
        "API (Application Programming Interface) utvikling og integrasjon refererer til prosessen med å skape grensesnitt som tillater ulike programvarer, systemer og applikasjoner å kommunisere og dele funksjoner eller data. APIer spiller en kritisk rolle i dagens digitale økosystem ved å muliggjøre sømløs interaksjon mellom forskjellige teknologiske løsninger, og effektivisere operasjoner ved å automatisere oppgaver og integrere forskjellige tjenester.",
      subContentTitle1: "Betydningen av API for Din Virksomhet",
      subContent1:
        "APIer tillater virksomheter å utvide funksjonaliteten til deres digitale plattformer, forbedre brukeropplevelsen, og åpne for nye inntektsstrømmer. Ved å integrere tredjepartstjenester eller eksterne applikasjoner, kan virksomheter tilby mer robuste og allsidige løsninger til sine kunder. APIer fremmer også innovasjon ved å gjøre det lettere for utviklere å bygge på eksisterende plattformer og tjenester.",
      subContentTitle2: "Kjerneelementer i API Utvikling og Integrasjon",
      subContentTitlePoint1: "Sikkerhet",
      subContentPoint1:
        "Sikker overføring av data og autentiseringsprotokoller er avgjørende for å beskytte sensitive informasjoner.",
      subContentTitlePoint2: "Skalerbarhet",
      subContentPoint2:
        "APIer må være designet for å håndtere voksende mengder forespørsler og data uten tap av ytelse.",
      subContentTitlePoint3: "Dokumentasjon",
      subContentPoint3:
        "Klare og omfattende API-dokumentasjoner er nødvendig for å lette integrasjon og bruk av APIet.",
      subContentTitlePoint4: "Kompabilitet",
      subContentPoint4:
        "APIer bør være utviklet for å sikre kompatibilitet med et bredt spekter av systemer og teknologier.",

      subContentTitle3: "Hvordan Inovix Optimaliserer Teknologisk Integrering",
      subContent3:
        "Inovix tilbyr avansert API utvikling og integrasjonstjenester som sikrer at dine systemer, applikasjoner og tredjepartstjenester fungerer sømløst sammen. Vårt team av erfarne utviklere forstår kompleksiteten og utfordringene knyttet til API integrasjon og er dedikert til å levere robuste, sikre og effektive løsninger.",
      subContent4:
        "Vi tilpasser API-utviklingen for å møte dine spesifikke behov, enten det er å koble sammen interne systemer, integrere med eksterne tjenester, eller utvikle nye APIer som lar andre bygge på din plattform. Vår tilnærming sikrer at integrasjonene forbedrer operasjonell effektivitet, forsterker brukeropplevelser og støtter din forretnings vekststrategi.",
      subContent5:
        "I en stadig mer sammenkoblet digital verden, er API utvikling og integrasjon fundamentale for å sikre teknologisk fleksibilitet og konkurranseevne. Med Inovix som din partner i API utvikling, kan du være sikker på at din virksomhet vil dra nytte av skreddersydde, sikre og skalerbare API-løsninger som fremmer samarbeid og innovasjon. La oss hjelpe deg med å bygge broer mellom systemer og tjenester, og transformere måten din virksomhet opererer på i det digitale landskapet.",
    },
    {
      image: "/support-2.svg",
      title: "24 / 7 Support",
      lessContent:
        "Vi forstår viktigheten av kontinuerlig støtte for våre kunders virksomheter. Derfor tilbyr Inovix 24/7 teknisk støtte for å sikre at eventuelle problemer eller spørsmål blir håndtert raskt og effektivt, minimere nedetid og sikre en sømløs drift av dine digitale tjenester.",
      mainContent:
        "24/7 teknisk støtte refererer til en kontinuerlig tilgjengelig hjelpetjeneste designet for å løse tekniske problemer og gi assistanse til brukere når som helst, dag eller natt. Denne tjenesten er avgjørende for å opprettholde operasjonell kontinuitet, minimere nedetid, og sikre en jevn og problemfri brukeropplevelse.",
      subContentTitle1: "Betydningen av 24/7 Støtte for Din Virksomhet",
      subContent1:
        "I en globalisert verden, hvor virksomheter og deres kunder opererer over ulike tidssoner, er tilgang til rund-the-klokken teknisk støtte ikke bare en fordel, men en nødvendighet. Det sikrer at tekniske problemer som kan påvirke din virksomhetsdrift eller kundetilfredshet, raskt blir adressert og løst, uavhengig av når de oppstår.",
      subContentTitle2: "Kjerneelementer i Effektiv 24/7 Teknisk Støtte",
      subContentTitlePoint1: "Tilgjengelighet",
      subContentPoint1:
        "En dedikert støtteinfrastruktur som sikrer at hjelp er tilgjengelig 24/7, uten avbrudd.",
      subContentTitlePoint2: "Responsivitet",
      subContentPoint2:
        "Rask respons på forespørsler og problemer for å minimere ventetid og potensiell nedetid.",
      subContentTitlePoint3: "Ekspertise",
      subContentPoint3:
        "Et team av tekniske eksperter med dyptgående kunnskap om produktene og tjenestene som tilbys.",
      subContentTitlePoint4: "Flerspråklig Støtte",
      subContentPoint4:
        "Evnen til å betjene kunder på flere språk kan være avgjørende for globale virksomheter.",

      subContentTitle3: "Hvordan Inovix Sikrer Uavbrutt Drift",
      subContent3:
        "Inovix tilbyr omfattende 24/7 teknisk støtte tjenester som sikrer at din virksomhet og dine kunder alltid har tilgang til hjelp og veiledning. Vårt team av dedikerte supportteknikere er utstyrt for å håndtere et bredt spekter av tekniske spørsmål og utfordringer, og leverer rask og effektiv problemløsning uansett tidspunkt.",
      subContent4:
        "Vi forstår viktigheten av å opprettholde kontinuerlig drift og tilfredshet, både for din interne operasjon og for dine kunders opplevelse. Derfor investerer vi i opplæring og utvikling av vårt supportteam for å sikre at de er oppdatert på de nyeste teknologiene og beste praksisene. Vår flerspråklige støtte sikrer også at vi kan betjene et globalt klientell effektivt.",
      subContent5:
        "24/7 teknisk støtte er mer enn bare en tjeneste; det er et løfte om pålitelighet og engasjement for dine kunders suksess og tilfredshet. Med Inovix som din partner i teknisk støtte, får du ikke bare tilgang til ekspertise og assistanse når som helst, men du investerer også i en sømløs og sikker drift. La oss være din pålitelige partner, sikre din drift rundt klokken, og hjelpe deg med å bygge sterke og varige relasjoner med dine kunder.",
    },
  ];

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index); // Toggle active state
  };
  return (
    <div className="cards-container">
      {data.map((card: IService, index) => (
        <div
          className={`card ${activeCard === index ? "active" : ""}`}
          key={index}
          style={{
            display:
              activeCard !== null && activeCard !== index ? "none" : "flex",
          }}
          onClick={() => handleCardClick(index)}
        >
          <object
            type="image/svg+xml"
            data={`./${card.file_name}`}
            aria-label={card.title}
            className="card-image"
          />
          <div className={`card-body ${activeCard === index ? "active" : ""}`}>
            <h3>{card.title}</h3>
            <p>
              {activeCard === index ? card.main_content : card.less_content}
            </p>

            {activeCard === index && (
              <div className="card-sub-content">
                <h4>{card.sub_title}</h4>
                <p>{card.sub_content}</p>
                <h4>{card.sub_points_title}</h4>

                <ul className="service-list-points">
                  <li>
                    <span className="points-title">
                      {card.sub_point_titleA}
                    </span>
                    <span className="points-description">
                      {card.sub_point_contentA}
                    </span>
                  </li>
                  <li>
                    <span className="points-title">
                      {card.sub_point_titleB}
                    </span>
                    <span className="points-description">
                      {card.sub_point_contentB}
                    </span>
                  </li>
                  <li>
                    <span className="points-title">
                      {card.sub_point_titleC}
                    </span>
                    <span className="points-description">
                      {card.sub_point_contentC}
                    </span>
                  </li>
                  <li>
                    <span className="points-title">
                      {card.sub_point_titleD}
                    </span>
                    <span className="points-description">
                      {card.sub_point_contentD}
                    </span>
                  </li>
                  {card.sub_point_contentE && (
                    <li>
                      <span className="points-title">
                        {card.sub_point_titleE}
                      </span>
                      <span className="points-description">
                        {card.sub_point_contentE}
                      </span>
                    </li>
                  )}
                </ul>

                <h4>{card.summary_title}</h4>
                <p>{card.summary_main_content}</p>
                <p>{card.summary_sub_content}</p>
                <p className="summary">{card.summary_sub_sub_content}</p>
              </div>
            )}
          </div>
          {activeCard === index ? (
            <button
              className="card-button close-button"
              onClick={() => setActiveCard(null)}
            >
              Lukk
            </button>
          ) : (
            <button
              className="card-button"
              onClick={() => setActiveCard(index)}
            >
              Les mer
            </button>
          )}
        </div>
      ))}
    </div>
    // <div className="cards-container">
    //   {cards.map((card, index) => (
    //     <div
    //       className={`card ${activeCard === index ? "active" : ""}`}
    //       key={index}
    //       style={{
    //         display:
    //           activeCard !== null && activeCard !== index ? "none" : "flex",
    //       }}
    //       onClick={() => handleCardClick(index)}
    //     >
    //       <object
    //         type="image/svg+xml"
    //         data={card.image}
    //         aria-label={card.title}
    //         className="card-image"
    //       />
    //       <div className={`card-body ${activeCard === index ? "active" : ""}`}>
    //         <h3>{card.title}</h3>
    //         <p>{activeCard === index ? card.mainContent : card.lessContent}</p>

    //         {activeCard === index && (
    //           <div className="card-sub-content">
    //             <h4>{card.subContentTitle1}</h4>
    //             <p>{card.subContent1}</p>
    //             <h4>{card.subContentTitle2}</h4>

    //             <ul className="service-list-points">
    //               <li>
    //                 <span className="points-title">
    //                   {card.subContentTitlePoint1}
    //                 </span>
    //                 <span className="points-description">
    //                   {card.subContentPoint1}
    //                 </span>
    //               </li>
    //               <li>
    //                 <span className="points-title">
    //                   {card.subContentTitlePoint2}
    //                 </span>
    //                 <span className="points-description">
    //                   {card.subContentPoint2}
    //                 </span>
    //               </li>
    //               <li>
    //                 <span className="points-title">
    //                   {card.subContentTitlePoint3}
    //                 </span>
    //                 <span className="points-description">
    //                   {card.subContentPoint3}
    //                 </span>
    //               </li>
    //               <li>
    //                 <span className="points-title">
    //                   {card.subContentTitlePoint4}
    //                 </span>
    //                 <span className="points-description">
    //                   {card.subContentPoint4}
    //                 </span>
    //               </li>
    //               {card.subContentTitlePoint5 && (
    //                 <li>
    //                   <span className="points-title">
    //                     {card.subContentTitlePoint5}
    //                   </span>
    //                   <span className="points-description">
    //                     {card.subContentPoint5}
    //                   </span>
    //                 </li>
    //               )}
    //             </ul>

    //             <h4>{card.subContentTitle3}</h4>
    //             <p>{card.subContent3}</p>
    //             <p>{card.subContent4}</p>
    //             <p className="summary">{card.subContent5}</p>
    //           </div>
    //         )}
    //       </div>
    //       {activeCard === index ? (
    //         <button
    //           className="card-button close-button"
    //           onClick={() => setActiveCard(null)}
    //         >
    //           Lukk
    //         </button>
    //       ) : (
    //         <button
    //           className="card-button"
    //           onClick={() => setActiveCard(index)}
    //         >
    //           Les mer
    //         </button>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
};

export default ServicePageCards;
