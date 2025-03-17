import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Spinner,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

// Lazy Load ProductCard
const ProductCard = lazy(() => import("./ProductCard"));

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState(""); // category filter state
  const [priceRange, setPriceRange] = useState([0, 1000]); // default price range
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [sortOption, setSortOption] = useState(""); // Sorting state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category, price, and search term
  const filteredProducts = products
    .filter((product) =>
      categoryFilter ? product.category === categoryFilter : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") return a.price - b.price;
      if (sortOption === "priceHighToLow") return b.price - a.price;
      if (sortOption === "ratingHighToLow")
        return b.rating.rate - a.rating.rate;
      // if(sortOption  === "priceAndRatingHighToLow"){
      //   if(b.price === a.price){
      //     return b.rating.rate - a.rating.rate;
      //   }
      //   return b.price - a.price;
      // }
      return 0; // Default (no sorting)
    });

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  const handlePriceRangeChange = (range) => {
    switch (range) {
      case "under100":
        setPriceRange([0, 100]);
        break;
      case "100to200":
        setPriceRange([100, 200]);
        break;
      case "200to500":
        setPriceRange([200, 500]);
        break;
      case "500to1000":
        setPriceRange([500, 1000]);
        break;
      default:
        setPriceRange([0, 1000]);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fst-italic">Explore Styles</h2>

      {/* Filters */}
      <Row className="mb-5">
        {/* Category Filter */}
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              className="ms-5"
              id="dropdown-category"
            >
              Category: {categoryFilter || "All"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCategoryFilter("")}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setCategoryFilter("women's clothing")}
              >
                Women's Clothing
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setCategoryFilter("men's clothing")}
              >
                Men's Clothing
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("electronics")}>
                Electronics
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryFilter("jwellery")}>
                Jwellery
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Price Range Filter (Dropdown) */}
        <Col md={3} className="text-start">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="dropdown-price-range"
            >
              Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handlePriceRangeChange("under100")}>
                Under 100
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceRangeChange("100to200")}>
                100 - 200
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceRangeChange("200to500")}>
                200 - 500
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handlePriceRangeChange("500to1000")}
              >
                500 - 1000
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceRangeChange("all")}>
                All Prices
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Search Filter */}
        <Col md={3}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </Button>
          </InputGroup>
        </Col>

        {/* Sorting */}
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="dropdown-sort"
              className="ms-5"
            >
              Sort By: {sortOption || "None"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOption("")}>
                None
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("priceLowToHigh")}>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("priceHighToLow")}>
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("ratingHighToLow")}>
                Rating: High to Low
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => setSortOption("priceAndRatingHighToLow")}>
                Price and Rating : High to Low
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Product List */}
      <Row className="g-4 shadow-lg">
        {loading && (
          <div className="text-center mb-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {!loading &&
          filteredProducts.slice(0, visibleProducts).map((product) => (
            <Col md={4} lg={3} key={product.id}>
              <Suspense
                className=""
                fallback={
                  <div className="text-center">
                    <Spinner animation="border" variant="secondary" />
                  </div>
                }
              >
                <ProductCard className="h-100 shadow-lg" product={product} />
              </Suspense>
            </Col>
          ))}
      </Row>

      {/* Load More Button */}
      {visibleProducts < filteredProducts.length && !loading && (
        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default AllProducts;
