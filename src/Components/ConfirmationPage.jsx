import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ConfirmationPage = () => {
  const {
    cart,
    subtotal,
    couponDiscount,
    estimatedTax,
    giftCardDiscount,
    shipping,
  } = useCart();
  const location = useLocation(); // Access data passed from previous steps
  const navigate = useNavigate(); // Navigation hook
  const {
    selectedShippingMethod,
    shippingCost,
    email,
    phone,
    country,
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    zip,
    shippingMethod,
    paymentMethod,
    billingAddress,

    total,
  } = location.state || {};

  const calculateTotal = () => {
    return calculateSubTotal() + shippingCost;

    // return subtotal + shippingCost;
  };

  const calculateSubTotal = () => {
    // return 100;
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotal();

  const handlePlaceOrder = () => {
    const products = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }));

    // Simulate order placement and navigate to success page
    navigate("/order-success", {
      state: {
        orderId: "12345",
        //  total:calculateTotal()
        products: products,
        total: totalPrice,
      },
    });
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 fst-italic">Order Confirmation</h3>
      <Row>
        {/* Order Summary */}
        <Col md={8}>
          {/* Shipping Information */}
          <Card className="mb-4 p-3 shadow">
            <h5 className="mb-3 fst-italic">Shipping Information</h5>
            <p className="fst-italic">
              <strong>Name:</strong> {`${firstName} ${lastName}`}
            </p>
            <p className="fst-italic">
              <strong>Address:</strong>{" "}
              {`${streetAddress}, ${city}, ${state} ${zip}`}
            </p>
            <p className="fst-italic">
              <strong>Phone:</strong> {phone}
            </p>
            <p className="fst-italic">
              <strong>Email:</strong> {email}
            </p>
          </Card>

          {/* Shipping Method */}
          <Card className="mb-4 p-3 shadow">
            <h5 className="fst-italic">Shipping Method</h5>
            <p className="fst-italic"> {shippingMethod || "N/A"} </p>
            <p className="fst-italic">
              <strong>Shipping Cost:</strong>
              {shippingCost.toFixed(2)}
            </p>
          </Card>

          {/* Payment Information */}
          <Card className="mb-4 p-3 fst-italic shadow">
            <h5 className="mb-3">Payment Information</h5>
            <p>
              <strong>Method:</strong> {paymentMethod || "N/A"}
            </p>
            {paymentMethod === "CreditCard" && (
              <p>
                <strong>Billing Address:</strong>{" "}
                {`${billingAddress?.firstName} ${billingAddress?.lastName}, 
                ${billingAddress?.streetAddress}
                , ${billingAddress?.city}, ${billingAddress?.state} ${billingAddress?.zip}`}
              </p>
            )}
          </Card>

          {/* Place Order Button */}
          <Button
            variant="outline-success"
            className="w-100"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Col>

        {/* Pricing Summary */}
        <Col md={4}>
          <Card className="p-3 fst-italic shadow">
            <h5 className="mb-3">Pricing Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>Rs.{calculateSubTotal().toFixed(2) || "0.00"}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Coupon Discount</span>
              <span>-Rs.{(couponDiscount || 0).toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Gift Card Discount</span>
              <span>-Rs.{(giftCardDiscount || 0).toFixed(2)}</span>
            </div>{" "}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Estimated Tax</span>
              <span>Rs.{estimatedTax?.toFixed(2) || "0.00"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "FREE" : `Rs.${shippingCost?.toFixed(2)}`}
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>Rs{calculateTotal().toFixed(2)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;
