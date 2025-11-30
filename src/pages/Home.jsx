// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import bikecity from '../assets/images/bikecity.jpg';
// import bikeadventure from '../assets/images/bikeadventure.jpg';
// import bikeparco from '../assets/images/bikeparco.jpg';
// import romebike from '../assets/images/romebike.jpg';
// import bikepanorama from '../assets/images/bikepanorama.webp';
// import "../Home.css";



// export default function Home() {
//   const tours = [
//     { title: "Tour in città", desc: "Visita i luoghi iconici...", img: romebike },
//     { title: "Tour nella natura", desc: "Percorri sentieri...", img: bikeparco },
//     { title: "Tour avventura", desc: "Sentieri e colline...", img: bikeadventure },
//   ];

//   return (
//     <>
     
//       <section style={{ position: "relative", textAlign: "center" }}>
//         <img
//           src={bikecity}
//           alt="Hero banner"
//           style={{
//             width: "100%",
//             maxHeight: "500px",
//             objectFit: "cover",
//             filter: "brightness(50%)",
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "white",
//           }}
//         >
//           <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
//             Scopri il mondo in bici
//           </h1>
//           <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
//             Tour guidati tra città, natura e avventura. Esperienze uniche per tutti.
//           </p>
//           {/* <Button as={Link} to="#tour" variant="light">
//             Scopri i Tour
//           </Button> */}
//         </div>
//       </section>

//       <Container id="tour" className="py-5">
//         <h2 className="text-center mb-4">I nostri tour</h2>
//         <Row className="g-4">
//           {tours.map((tour, i) => (
//             <Col key={i} xs={12} md={4}>
//               <Card className="h-100">
//                 <Card.Img
//                   variant="top"
//                   src={tour.img}
//                   style={{ height: "250px", objectFit: "cover" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title>{tour.title}</Card.Title>
//                   <Card.Text>{tour.desc}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>

        
//         <div className="text-center mt-4">
//           <Button as={Link} to="/bike-tours" variant="success">
//             Scopri tutti i tour
//           </Button>
//         </div>
//       </Container>

      
//       <section style={{ backgroundColor: "#f8f9fa", padding: "3rem 0" }}>
//         <Container>
//           <h2 className="text-center mb-4">Perché scegliere noi</h2>
//           <Row className="g-4 text-center">
//             <Col xs={12} md={4}>
//               <div>
//                 <div style={{ fontSize: "3rem" }}>🚴‍♂️</div>
//                 <h4>Esperienza</h4>
//                 <p>Guide locali con anni di esperienza e conoscenza dei percorsi migliori.</p>
//               </div>
//             </Col>
//             <Col xs={12} md={4}>
//               <div>
//                 <div style={{ fontSize: "3rem" }}>🛡️</div>
//                 <h4>Sicurezza</h4>
//                 <p>Tour studiati per garantire divertimento in totale sicurezza.</p>
//               </div>
//             </Col>
//             <Col xs={12} md={4}>
//               <div>
//                 <div style={{ fontSize: "3rem" }}>😄</div>
//                 <h4>Divertimento</h4>
//                 <p>Esperienze uniche e memorabili per ciclisti di tutti i livelli.</p>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

      
//       <section style={{ textAlign: "center", padding: "3rem 0" }}>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <img
//             src={bikepanorama}
//             alt="Banner bici"
//             style={{ width: "100%", maxWidth: "800px", borderRadius: "0.5rem", objectFit: "cover" }}
//           />
//         </div>
//         <h2 style={{ marginTop: "1.5rem" }}>Pedala con noi e vivi l'avventura</h2>
//       </section>

      
//     </>
//   );
// }


import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

import bikecity from '../assets/images/bikecity.jpg';
import bikeadventure from '../assets/images/bikeadventure.jpg';
import bikeparco from '../assets/images/bikeparco.jpg';
import romebike from '../assets/images/romebike.jpg';
import bikepanorama from '../assets/images/bikepanorama.webp';

import "../Home.css"; // <-- IMPORT CSS

export default function Home() {

  const tours = [
    { title: "Tour in città", desc: "Visita i luoghi iconici...", img: romebike },
    { title: "Tour nella natura", desc: "Percorri sentieri...", img: bikeparco },
    { title: "Tour avventura", desc: "Sentieri e colline...", img: bikeadventure },
  ];

  return (
    <>
      <section style={{ position: "relative", textAlign: "center" }}>
        <img
          src={bikecity}
          alt="Hero banner"
          className="fade-in"
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Scopri il mondo in bici
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
            Tour guidati tra città, natura e avventura. Esperienze uniche per tutti.
          </p>
        </div>
      </section>

      <Container id="tour" className="py-5">
        <h2 className="text-center mb-4 fade-in">I nostri tour</h2>

        <Row className="g-4">
          {tours.map((tour, i) => (
            <Col key={i} xs={12} md={4}>
              <Card className="h-100 tour-card fade-in">
                <Card.Img
                  variant="top"
                  src={tour.img}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{tour.title}</Card.Title>
                  <Card.Text>{tour.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4 fade-in">
          <Button as={Link} to="/bike-tours" variant="success">
            Scopri tutti i tour
          </Button>
        </div>
      </Container>

      <section style={{ backgroundColor: "#f8f9fa", padding: "3rem 0" }}>
        <Container>
          <h2 className="text-center mb-4 fade-in">Perché scegliere noi</h2>

          <Row className="g-4 text-center">
            <Col xs={12} md={4}>
              <div className="why-box fade-in">
                <div style={{ fontSize: "3rem" }}>🚴‍♂️</div>
                <h4>Esperienza</h4>
                <p>Guide locali con anni di esperienza e conoscenza dei percorsi migliori.</p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="why-box fade-in">
                <div style={{ fontSize: "3rem" }}>🛡️</div>
                <h4>Sicurezza</h4>
                <p>Tour studiati per garantire divertimento in totale sicurezza.</p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="why-box fade-in">
                <div style={{ fontSize: "3rem" }}>😄</div>
                <h4>Divertimento</h4>
                <p>Esperienze uniche e memorabili per ciclisti di tutti i livelli.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ textAlign: "center", padding: "3rem 0" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={bikepanorama}
            alt="Banner bici"
            className="fade-in"
            style={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "0.5rem",
              objectFit: "cover",
            }}
          />
        </div>
        <h2 className="fade-in" style={{ marginTop: "1.5rem" }}>
          Pedala con noi e vivi l'avventura
        </h2>
      </section>
    </>
  );
}
