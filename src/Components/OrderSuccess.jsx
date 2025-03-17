import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total, products } = location.state || {};
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  }; 

  const formattedTotal = total && ! isNaN(total) ? total.toFixed(2): "0.00";

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 fst-italic">Order Successfully Created!</h3>
      <Row>
        <Col md={8}>
          <Card className="mb-4 p-3 fst-italic shadow">
            <h5 className="mb-3">Order Details</h5>
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
            <p>
              <strong>Total:</strong> Rs. {formattedTotal}
            </p>
            <h5>Products in Your Order</h5>
            <Row>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <Col md={4} key={product.id}>
                    <Card className="mb-3">
                      <Card.Img className="px-3 py-3"
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        style={{ height: "150px",
                          //  objectFit: "cover"
                           }}
                      />
                      <Card.Body>
                        <Card.Title className="fs-6">{product.title}</Card.Title>
                        <Card.Text className="fw-bold">Rs. {product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
            <Button
              variant="outline-primary"
              onClick={handleContinueShopping}
              className="w-100"

            >
              Continue Shopping
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
