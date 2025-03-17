import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };
  return (
    <Row className="m-5">
      <span className="fs-3 fw-bold fst-italic text-center mb-4 mt-3">
        Shop by Category
      </span>
      <Col sm={12} md={6} lg={3}>
        <Card className="text-center fst-italic shadow-lg">
          <Card.Img variant="top" src="womens.jpg" className="" />
          <Card.Body>
            <Card.Title className="mt-3">Women</Card.Title>
            <Button
              variant=""
              as={Link}
              to="/products/women"
              className="btn btn-outline-primary fst-italic "
            >
              Find your style
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={3}>
        <Card className="text-center fst-italic shadow-lg">
          <Card.Img varient="top" src="mens.jpg" />
          <Card.Body>
            <Card.Title className="mt-3">Men</Card.Title>
            <Button
              variant=""
              as={Link}
              to="/products/men"
              className="btn btn-outline-primary fst-italic"
            >
              Find your style
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={3}>
        <Card className="text-center fst-italic shadow-lg">
          <Card.Img variant="top" src="electronics.jpg" />
          <Card.Body>
            <Card.Title className="mt-3">Electronics</Card.Title>
            <Button
              variant=""
              as={Link}
              to="/products/electronics"
              className="btn btn-outline-primary fst-italic"
            >
              Find your style
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={12} md={6} lg={3}>
        <Card className="text-center fst-italic shadow-lg">
          <Card.Img variant="top" src="jwellery.jpg" />
          <Card.Body>
            <Card.Title className="mt-3">Jwellery</Card.Title>
            <Button
              variant=""
              as={Link}
              to="/products/jewelery"
              className="btn btn-outline-primary fst-italic"
            >
              Find your style
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Container
        className="text-black px-0 mb-5 shadow-lg mt-5 "
        style={{ backgroundColor: "#B5C18E", width: "98%" }}
      >
        <Row className="align-items-center">
          <Col md={8}>
            <img
              src="bottom-img.jpg"
              alt="Adventure Banner"
              className="img-fluid"
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col md={4} className="text-center">
            <p className=" fst-italic fs-4 mb-4">Find It. Love It. Buy It</p>
            <Button
              variant=""
              size="md"
              className="fst-italic btn btn-outline-dark"
              onClick={handleClick}
            >
              Shop the Look
            </Button>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

export default CategorySection;
