import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4">
      <Container>
        <Row>
          <Col md={3} className="text-start">
            <h5 className="fst-italic">Account</h5>
            <p className="fst-italic">Sign In</p>
            <p className="fst-italic">Register</p>
            {/* <p>Other Status</p> */}
          </Col>
          <Col md={3} className="text-start">
            <h5 className="fst-italic">About Us</h5>
            <p className="fst-italic">Our Story</p>
            <p className="fst-italic">Careers</p>
          </Col>
          <Col md={3} className="text-start">
            <h5 className="fst-italic">Help</h5>
            <p className="fat-italic">Contact Us</p>
            {/* <p>Other Status</p> */}
            <p className="fst-italic">Returns</p>
          </Col>
          <Col md={3} className="text-start">
            <h5 className="fst-italic">Follow Us</h5>
            <p className="fst-italic">Social Links</p>
            <i className="bi bi-twitter pe-4"></i>
            <i className="bi bi-instagram pe-4"></i>
            <i className="bi bi-facebook pe-4"></i>
          </Col>
          <Col className="text-center mt-3">
            <p className="fat-italic">
              &copy; 2024 E-Commerce, All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
