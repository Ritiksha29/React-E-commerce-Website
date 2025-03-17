
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from "./CartContext";

import ProductListing from './ProductListing';
 
const PaymentMethod = () => {
  const {cart ,couponDiscount=0,giftCardDiscount=0,estimatedTax=0} = useCart();
  const location = useLocation(); // Access data passed from ShippingMethod
  const navigate = useNavigate(); // Navigation hook
  const {selectedShippingMethod ,shippingCost , shippingMethod, products,email,phone,firstName,lastName,streetAddress,city,state,zip} = location.state || {};
 
  

 

 

  const calculateTotal = () => {

    return calculateSubTotal() + shippingCost;
    

    
    
    // return subtotal + shippingCost;
    
  };

  const calculateSubTotal = ()=>{
    // return 100;
    return cart.reduce((total,item)=>total+ item.price * item.quantity,0)
  }




 
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CreditCard');
 
  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleContinueToPayment = () => {
    const finalBillingAddress = billingSameAsShipping
      ? { firstName, lastName, streetAddress, city, state, zip }
      : billingAddress;
 
    console.log('Payment Information:', {
      email,
      phone,
      shippingInfo: { firstName, lastName, streetAddress, city, state, zip },
      billingInfo: finalBillingAddress,
      paymentMethod: selectedPaymentMethod,
     
      products,
    });
 
    // Navigate to confirmation or next step
    navigate('/confirmation', { state: { ...location.state, 
      billingAddress: finalBillingAddress ,
       paymentMethod:selectedPaymentMethod,
      products:location.state?.products || [,]} });
      console.log("Products are being passed to Confirmation:",location.state?.products)
  };
 
  return (
    <Container className="my-5 fst-italic">
      <h4 className="text-center mb-4">Payment Method</h4>
      <Row>
        {/* Shipping Information */}
        <Col md={8}>
          <Card className="mb-4 p-3 shadow">
            <h5 className='mb-3'>Shipping Information</h5>
            <p>
              <strong>Email:</strong> {email || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {phone || 'N/A'}
            </p>
            <p>
              <strong>Address:</strong>{' '}
              {`${firstName || ''} ${lastName || ''}, ${streetAddress || ''}, ${
                city || ''
              }, ${state || ''} ${zip || ''}`}
            </p>
            {/* <p>
              <strong>Shipping Method:</strong> {shippingMethod || 'N/A'}
            </p> */}
          </Card>
          <Card className='shadow px-3 py-3 mb-4'>
            <h5 className='mb-3'>Shipping Method</h5>
          <p>
              <strong>Shipping Method:</strong>
              {/* {selectedShippingMethod} */}
               {shippingMethod || 'N/A'}
            </p>
            <p>
              <strong>Shipping Cost:</strong>
              {shippingCost.toFixed(2)}
               {/* {shippingMethod || 'N/A'} */}
            </p>
          </Card>
 
          {/* Payment Method */}
          <Card className="mb-4 p-3 shadow">
            <h5>Select Payment Method</h5>
            <Form>
              <Form.Check
                type="radio"
                id="creditCard"
                label="Credit Card"
                name="paymentMethod"
                value="CreditCard"
                checked={selectedPaymentMethod === 'CreditCard'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                id="otherMethod"
                label="Other Method (e.g., PayPal)"
                name="paymentMethod"
                value="Other"
                checked={selectedPaymentMethod === 'Other'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
            </Form>
 
            {/* Credit Card Information */}
            {selectedPaymentMethod === 'CreditCard' && (
              <div className="mt-4">
                <h6>Credit Card Information</h6>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name on Card</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Card Number" />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="CVV" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Check
                    type="checkbox"
                    label="Billing address same as shipping address"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  {!billingSameAsShipping && (
                    <div className="mt-3">
                      <h6>Billing Address</h6>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={billingAddress.firstName}
                            onChange={handleBillingAddressChange}
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={billingAddress.lastName}
                            onChange={handleBillingAddressChange}
                          />
                        </Col>
                      </Row>
                      <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Street Address"
                        name="streetAddress"
                        value={billingAddress.streetAddress}
                        onChange={handleBillingAddressChange}
                      />
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
value={billingAddress.city}
                            onChange={handleBillingAddressChange}
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={billingAddress.state}
                            onChange={handleBillingAddressChange}
                          />
                        </Col>
                      </Row>
                      <Form.Control
                        type="text"
                        placeholder="ZIP Code"
                        name="zip"
value={billingAddress.zip}
                        onChange={handleBillingAddressChange}
                      />
                    </div>
                  )}
                </Form>
              </div>
            )}
          </Card>
 
          {/* Continue to Payment Button */}
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={handleContinueToPayment}
          >
            Continue to Payment
          </Button>
        </Col>
 
        {/* Pricing Summary */}
        <Col md={4}>
          <Card className="p-3 shadow">
            <h5 className='mb-3'>Pricing Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>Rs.{calculateSubTotal().toFixed(2) || '0.00'}</span>
            </div> <hr />
            <div className="d-flex justify-content-between">
              <span>Coupon Discount</span>
              <span>-Rs.{(couponDiscount || 0).toFixed(2)}</span>
            </div> <hr />
            <div className="d-flex justify-content-between">
              <span>Gift Card Discount</span>
              <span>-Rs.{(giftCardDiscount || 0).toFixed(2)}</span>
            </div> <hr />
            <div className="d-flex justify-content-between">
              <span>Estimated Tax</span>
              <span>Rs.{estimatedTax?.toFixed(2) || '0.00'}</span>
            </div> <hr />
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `Rs.${shippingCost.toFixed(2)}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>${calculateTotal().toFixed(2)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
 
export default PaymentMethod;
