import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const ProductListing = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // const handleAddToCart =(product) =>{
  //   addToCart(product);
  //   navigate("/cart");
  // }
  const handleviewDetails = (product) => {
    navigate(`/product-details/${product.id}`);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (products.length) {
      filterProducts(products, category);
    }
  }, [category, products]);

  const filterProducts = (products, category) => {
    const filtered = products.filter((product) =>
      category === "women"
        ? product.category === "women's clothing"
        : category === "men"
        ? product.category === "men's clothing"
        : category === "electronics"
        ? product.category === "electronics"
        : category === "jewelery"
        ? product.category === "jewelery"
        : true
    );
    setFilteredProducts(filtered);
    setVisibleProducts(10);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 fst-italic text-center">
        {" "}
        Featured Products
        {/* {category.charAt(0).toUpperCase() + category.slice(1)} `s Products */}
      </h3>

      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Row className="m-3 g-3 shadow-lg">
        {!loading &&
          filteredProducts.slice(0, visibleProducts).map((product) => (
            <Col sm={12} md={6} lg={3} key={product.id}>
              <Card className="h-100 shadow-lg ">
                <Card.Img
                  className="px-4 py-4"
                  variant="top"
                  src={product.image}
                  style={{ height: "200px" }} // Ensures images maintain a consistent size
                />
                <Card.Body>
                  <Card.Title className="text-center fs-6">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="text-center fs-6">
                    Rs.{product.price.toFixed(2)}
                  </Card.Text>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {product.description.length > 60
                      ? `${product.description.substring(0, 60)}...`
                      : product.description}
                  </Card.Text>
                  <Card.Text className="fw-bold text-warning text-center">
                    ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                  </Card.Text>

                  <Button
                    variant="outline-primary"
                    className="w-100 mb-3"
                    onClick={() => handleviewDetails(product)}
                  >
                    View Product
                  </Button>
                  {/* <Button variant="outline-primary" className="w-100" onClick={()=>handleAddToCart(product)}>
                    Add To Cart
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      {visibleProducts < filteredProducts.length && !loading && (
        <div className="text-center mt-4">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </Container>
  );
};

export default ProductListing;
