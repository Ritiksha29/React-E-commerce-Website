import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ShippingMethod = () => {
  const location = useLocation(); // Access data passed from Checkout
  const navigate = useNavigate(); // Navigation hook

  const shippingInfo = location.state || {};
  const { products = [] } = shippingInfo;
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const {
    cart,
    couponDiscount = 0,
    giftCardDiscount = 0,
    estimatedTax = 0,
  } = useCart();

  const calculateProductTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total
  const calculateTotal = () => {
    const productTotal = calculateProductTotal();

    const discountAmount = couponDiscount + giftCardDiscount;
    const shippingCostValue = shippingCost === 0 ? 0 : shippingCost;
    return productTotal - discountAmount + estimatedTax + shippingCost;
  };

  // Handle shipping method selection
  const handleShippingSelection = (method) => {
    if (method === "Standard") setShippingCost(10);
    else if (method === "Express") setShippingCost(20);
    else setShippingCost(0); // Free shipping for eligible orders
    setSelectedShippingMethod(method);
  };

  return (
    <Container className="my-5">
      <h4 className="text-center mb-4 fst-italic">Shipping Method</h4>
      <Row>
        {/* Shipping Information */}
        <Col md={8}>
          <Card className="mb-4 p-3 fst-italic">
            <h5 className=" mb-3">Shipping Information</h5>
            <p>
              <strong>Email: </strong>
              {shippingInfo.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {shippingInfo.phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${shippingInfo.firstName || ""} ${
                shippingInfo.lastName || ""
              }, ${shippingInfo.streetAddress || ""}, ${
                shippingInfo.city || ""
              }, ${shippingInfo.state || ""} ${shippingInfo.zip || ""}`}
            </p>
          </Card>

          {/* Shipping Method Selection */}
          <Card className="mb-4 p-3 fst-italic">
            <h5 className="mb-3">Select Shipping Method</h5>
            <Form>
              <Form.Check
                type="radio"
                label="Standard Shipping ($10.00)"
                name="shippingMethod"
                onChange={() => handleShippingSelection("Standard")}
                checked={selectedShippingMethod === "Standard"}
              />
              <Form.Check
                type="radio"
                label="Express Shipping ($20.00)"
                name="shippingMethod"
                onChange={() => handleShippingSelection("Express")}
                checked={selectedShippingMethod === "Express"}
              />
              <Form.Check
                type="radio"
                label="Free Shipping (Orders above $100)"
                name="shippingMethod"
                onChange={() => handleShippingSelection("Free")}
                checked={selectedShippingMethod === "Free"}
              />
            </Form>
          </Card>

          {/* Continue to Payment Button */}
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() =>
              navigate("/payment-method", {
                state: {
                  ...shippingInfo,
                  shippingMethod: selectedShippingMethod,
                  shippingCost,
                  total: calculateTotal(),
                  products,
                },
              })
            }
            disabled={!selectedShippingMethod}
          >
            Continue to Payment
          </Button>
        </Col>

        {/* Pricing Summary */}
        <Col md={4}>
          <Card className="p-3 shadow fst-italic">
            <h5 className="mb-4">Pricing Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>Rs.{calculateProductTotal().toFixed(2) || "0.00"}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Coupon Discount</span>
              <span>-Rs{(couponDiscount || 0).toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Gift Card Discount</span>
              <span>-Rs{(giftCardDiscount || 0).toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Estimated Tax</span>
              <span>Rs.{estimatedTax?.toFixed(2) || "0.00"}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "FREE" : `Rs.${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>Rs.{calculateTotal().toFixed(2)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingMethod;
