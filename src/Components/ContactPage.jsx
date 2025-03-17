import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const ContactPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh
    setShowAlert(true); // Show alert on form submission

    // Optional: Reset the alert after a few seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <Container className="my-5 bg-primary-subtle px-5 py-5 rounded-3 shadow-lg">
      <h3 className="text-center mb-5 fst-italic ">Contact Us</h3>

      {/* Alert Section */}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>Thank You!</Alert.Heading>
          <p>
            Your response has been successfully submitted. We will get back to
            you soon!!
          </p>
        </Alert>
      )}

      <Row>
        {/* Contact Form */}

        <Col
          md={6}
          className="border border-dark-subtle bg-secondary-subtle px-4 py-4 rounded-4 shadow"
        >
          <h4 className="fst-italic text-center">Send Us a Message</h4>
          <Form onSubmit={handleSubmit} className="">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="fst-italic">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="fst-italic">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label className="fst-italic">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your message here..."
                required
              />
            </Form.Group>

            <Button
              variant="outline-primary"
              type="submit"
              className="w-100 mt-3"
            >
              Submit
            </Button>
          </Form>
        </Col>

        {/* Contact Information */}
        <Col md={6} className="justify-content-between px-5">
          <h5 className="fst-italic">Contact Information</h5>
          <p className="fst-italic">
            If you have any questions or need assistance, feel free to contact
            us using the information below.
          </p>
          <ul className="list-unstyled">
            <li>
              <strong className="fst-italic">Address:</strong> 123 E-Commerce
              St, Shoporia, SC 12345
            </li>
            <li>
              <strong className="fst-italic">Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong className="fst-italic">Email:</strong>{" "}
              support@shoporia.com
            </li>
          </ul>
          <h5 className="mt-4 fst-italic">Follow Us</h5>
          <div>
            <a href="https://twitter.com" className="me-3">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://instagram.com" className="me-3">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
