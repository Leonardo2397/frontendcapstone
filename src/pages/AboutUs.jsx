import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <>
    

      <Container className="py-5">
        <h1 className="text-center mb-4">About Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          TopBike è una nuova realtà nel mondo dei tour in bicicletta, nata con la passione
          per la mobilità sostenibile e l'avventura all'aria aperta. Anche se siamo un’azienda
          giovane, il nostro team vanta anni di esperienza nel settore turistico e nella guida di
          percorsi ciclistici sicuri e coinvolgenti.  
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          La nostra missione è offrire tour personalizzati, affidabili e divertenti per tutti,
          combinando sicurezza, conoscenza dei territori e servizi di qualità. Siamo convinti che
          scoprire una città o la natura in bicicletta sia l’esperienza più autentica e appagante.
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          Unisciti a noi e vivi esperienze uniche, guidate dalla passione, dalla professionalità e
          dalla cura dei dettagli.
        </p>
      </Container>

    
    </>
  );
}
