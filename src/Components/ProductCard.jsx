import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


 
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleViewDetails = ()=>{
    navigate(`/product-details/${product.id}`);
  }



  
  
  return(
  <Card className="h-100 shadow-sm"
  style={{border :"none"}}
  >
    <Card.Img
      variant="top"
      src={product.image}
      alt={product.title}
      style={{
        height: "200px",
        objectFit: "contain",
       
      }}
    />
    <Card.Body className="d-flex flex-column justify-content-between">
      <div>
        <Card.Title className="fs-6 text-truncate text-center">{product.title}</Card.Title>
        <Card.Text className="fw-bold text-center">Rs. {product.price}</Card.Text>
        <Card.Text className="text-muted text-center" style={{ fontSize: "0.9rem" }}>
          {product.description.length > 60
            ? `${product.description.substring(0, 60)}...`
            : product.description}
        </Card.Text>
        <Card.Text className="fw-bold text-warning text-center">
                    ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                  </Card.Text>
      </div>
      <Button variant="outline-primary" className="mt-3" onClick={handleViewDetails} >View Details</Button>
     

    </Card.Body>
  </Card>
);
};
 
export default ProductCard;
 



