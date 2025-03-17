import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import ShippingMethod from "./ShippingMethod";

const Checkout = ({}) => {
  const { cart } = useCart(); // Access cart context
  const [subtotal, setSubtotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [giftCardDiscount, setGiftCardDiscount] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  const navigate = useNavigate();

  // Form data states.....

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    streetaddress: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    // Calculate pricing details
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
    setEstimatedTax(total * 0.05); // Assume 5% tax
    setShipping(total > 100 ? 0 : 10); // Free shipping for orders > $100
  }, [cart]);

  const calculateTotal = () => {
    return (
      subtotal - couponDiscount - giftCardDiscount + estimatedTax + shipping
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="my-5">
      <h4 className="text-center mb-4 fst-italic">Guest Checkout</h4>
      <Row>
        {/* Checkout Form */}
        <Col md={8}>
          <Form
            className="border border-secondary-subtle px-4 py-4 rounded-2 shadow fst-italic"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {/* Contact Information */}
            <h6 className="mb-3 ">Contact Information</h6>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">Email</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="email"
                  placeholder="abc@xyz.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=""
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">Phone Number</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="(222) 222-2222"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {/* Shipping Information */}
            <h6 className="mb-3 ">1. Shipping Information</h6>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">Country</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  as="select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Other</option>
                </Form.Control>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">First Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">Last Name</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">Street Address</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">City</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">State</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label className="">ZIP</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control type="text" placeholder="ZIP Code" />
              </Col>
            </Row>

            <Button
              variant="outline-primary"
              className="w-100 text-center mt-4"
              onClick={() => navigate("/shipping-method", { state: formData })}
            >
              Continue to Shipping Method
            </Button>
          </Form>
          <Card
            className="mb-4 mt-4 px-4 py-4 shadow fw-bold fst-italic"
            style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            onClick={() => navigate("/shipping-method")}
          >
            2. Shipping Method
          </Card>
          <Card
            className="mb-4 mt-4 px-4 py-4 shadow fw-bold fst-italic"
            style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
            onClick={() => navigate("/payment-method")}
          >
            3. Payment Method
          </Card>
        </Col>

        {/* Pricing Summary */}
        <Col md={4}>
          <Card className="p-3 shadow fst-italic">
            <h5 className="mb-4">Pricing Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Coupon Discount</span>
              <span>-Rs.{couponDiscount.toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Gift Card Discount</span>
              <span>-Rs.{giftCardDiscount.toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Estimated Tax</span>
              <span>Rs.{estimatedTax.toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "FREE" : `Rs.${shipping.toFixed(2)}`}
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <strong>Total</strong>
              <strong>Rs.{calculateTotal().toFixed(2)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
