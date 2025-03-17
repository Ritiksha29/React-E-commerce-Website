import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import { useCart } from "./CartContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Function to add product to cart

  useEffect(() => {
    // Fetch the product details using the product ID
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    };

    addToCart(item); // Add the item to the cart using context
    navigate("/cart"); // Navigate to the cart page
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <h4>Product not found</h4>
      </Container>
    );
  }

  return (
    <Container className="my-5 text-center">
      <Row className="align-items-center">
        {/* Image Outside Card */}
        <Col md={6} className="text-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
          />
        </Col>

        {/* Product Details Inside Card */}
        <Col md={6}>
          <Card className="shadow px-4 py-4">
            <Card.Body>
              <Card.Title className="fst-italic">{product.title}</Card.Title>
              <Card.Text className="mt-4 fw-bold fst-italic">
                <strong>Price:</strong> Rs.{product.price?.toFixed(2)}
              </Card.Text>
              <Card.Text className="text-center fst-italic mb-4">
                {product.description}
              </Card.Text>

              {/* Quantity Selector */}
              <div className=" align-items-center  mt-3 mb-3">
                <strong className="me-3 fst-italic">Quantity:</strong>
                <ButtonGroup>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <div
                    className="px-3 d-flex align-items-center justify-content-center border"
                    style={{ width: "50px" }}
                  >
                    {quantity}
                  </div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </div>

              <Button
                variant="outline-primary"
                className="w-100 mt-3"
                onClick={handleAddToCart}
              >
                Add {quantity} to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
