import React from "react";
import { Carousel, Container, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };
  return (
    <Container
      className=""
      style={{ margin: 0, padding: 0, backgroundColor: "#E7CCCC" }}
      fluid
      // className="bg-sky-400  "
      // style={{ backgroundColor: "#E7CCCC" }}
    >
      <Row className="align-items-center" style={{ minHeight: "350px" }}>
        <Col md={6} className="text-center fw-bold">
          <h2>
            <i>Shop the Latest Trends</i>
          </h2>
          <p className="fst-italic fs-5">Elevate your Everyday Essentials</p>
          <Button
            variant=""
            className="btn btn-outline-danger fst-italic"
            onClick={handleClick}
          >
            Shop Now
          </Button>
        </Col>
        <Col md={6} className="pe-0">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="crazy-deals.jpg"
                alt="First slide"
              />
              {/* <Carousel.Caption>
                <h3>Welcome to Our Shop</h3>
                <p>Discover amazing products at unbeatable prices!</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="mid-img.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                {/* <h3>Shop Now</h3>
                <p>Browse through our exclusive collections!</p> */}
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="shopping bag.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                {/* <h3>Shop Now</h3>
                <p>Browse through our exclusive collections!</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroBanner;
