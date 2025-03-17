import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    subtotal,
    couponDiscount,
    giftCardDiscount,
    estimatedTax,
    shipping,

    removeFromCart,
    updateCartItem,
  } = useCart();
  const navigate = useNavigate();

  const calculateProductTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const productTotal = calculateProductTotal();

  const calculateTotal = () => {
    const discountAmount = couponDiscount + giftCardDiscount;
    const shippingCost = shipping === 0 ? 0 : shipping;
    return productTotal - discountAmount + estimatedTax + shippingCost;
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container className="my-5">
      <h4 className="text-center mb-4 fst-italic mb-5">Your Shopping Bag</h4>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <h5 className="text-center fst-italic">Your cart is empty!</h5>
          ) : (
            cart.map((item) => (
              <Card key={item.id} className="mb-3 shadow">
                <Row className="align-items-center px-2 py-2">
                  <Col md={3}>
                    <Card.Img
                      className="px-2 py-2"
                      src={item.image}
                      alt={item.title}
                      style={{ height: "100px" }}
                    />
                  </Col>
                  <Col md={5}>
                    <Card.Body>
                      <Card.Title className="fst-italic">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="fst-italic fw-bold">
                        Price: Rs.{item.price}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                  <Col md={2} className="d-flex flex-column">
                    <InputGroup>
                      <Button
                        onClick={() =>
                          updateCartItem(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </Button>
                      <FormControl value={item.quantity} readOnly />
                      <Button
                        onClick={() =>
                          updateCartItem(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="outline-danger"
                      className="ms-2"
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Col>
        <Col md={4}>
          <Card className="px-4  py-4 fst-italic shadow">
            <h5 className="mb-4">Pricing Summary</h5>
            <div className="underline">
              Subtotal: Rs.{productTotal.toFixed(2)}
            </div>{" "}
            <hr />
            <div>Coupon Discount: Rs.{couponDiscount.toFixed(2)}</div> <hr />
            <div>Gift Card Discount: Rs.{giftCardDiscount.toFixed(2)}</div>{" "}
            <hr />
            <div>Estimated Tax: Rs.{estimatedTax.toFixed(2)}</div> <hr />
            <div>
              Shipping: {shipping === 0 ? "FREE" : `Rs.${shipping.toFixed(2)}`}
            </div>
            <hr />
            <div className="fw-bold mb-3">
              Total: Rs.{calculateTotal().toFixed(2)}
            </div>
            <Button onClick={handleCheckout}>Proceed to Checkout</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
