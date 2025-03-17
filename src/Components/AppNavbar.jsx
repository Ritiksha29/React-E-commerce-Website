import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const AppNavBar = () => {
  const { cart } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <i class="bi bi-bag-heart-fill ms-2"></i>
          <span className="ps-2 fst-italic fs-3">Shoporia</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="m-auto text-center">
            <Nav.Link as={Link} to="/" className="text-white fst-italic">
            <div className="nav-image">
                <img src="shopping-red-bag.jpg" alt="Home" />
              </div>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="text-white fst-italic"
            >
              <div className="nav-image">
                <img src="products-nav.jpg" alt="Products" />
              </div>
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              className="text-white fst-italic"
            >
              <div className="nav-image">
                <img src="categories.jpg" alt="Products" />
              </div>
              Category
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products/electronics"
              className="text-white fst-italic"
            >
              <div className="nav-image">
                <img src="watch.jpg" alt="Electronics" />
              </div>
              Electronics
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contactus"
              className="text-white fst-italic"
            >
              <div className="nav-image">
                <img src="contact-1.jpg" alt="Products" />
              </div>
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to="/cart" className="text-white fst-italic">
              <div className="position-relative d-inline-block">
                <i className="bi bi-cart fs-3"></i>
                {cart.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
