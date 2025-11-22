import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <>
     

      <Container className="py-5">
        <h1 className="text-center mb-4">Contact Us</h1>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <h4>Contatti</h4>
            <p>Email: info@topbike.com</p>
            <p>Telefono: +39 06 12345678</p>
            <p>Indirizzo: Via delle Biciclette 10, 00100 Roma, Italia</p>
            <p>Orari: Lun-Ven 09:00 - 18:00</p>
          </Col>
          <Col xs={12} md={6}>
            <h4>Scrivici un messaggio</h4>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Il tuo nome" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="La tua email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Messaggio</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Scrivi qui..." />
              </Form.Group>

              <Button variant="primary" type="submit">
                Invia Messaggio
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
}
