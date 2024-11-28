import React from "react";
import "./CheckoutPage.scss";

const CheckoutPage = () => {
    return (
        <div className="checkout-page">
            <div className="checkout-content">
                <div className="form-section">
                    <div className="breadcrumb">
                        <p>
                            <span>Your Cart</span> &gt; <span>Information</span> &gt;{" "}
                            <span>Shipping</span> &gt; <span>Payment</span>
                        </p>
                    </div>

                    {/* Contact Information Form */}
                    <div className="contact-information-form">
                        <h4>Contact Information</h4>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <label>First name</label>
                                <input type="text" placeholder="First name" />
                            </div>
                            <div className="input-group">
                                <label>Last name</label>
                                <input type="text" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <div>Email</div>
                                <input type="email" placeholder="you@example.com" />
                            </div>
                        </div>
                        <div className="check-out-checkbox">
                            <input type="checkbox" id="newsletter" />
                            <label htmlFor="newsletter">
                                Keep me updated with your latest news and offers
                            </label>
                        </div>
                    </div>

                    {/* Shipping Address Form */}
                    <div className="shipping-address-form">
                        <h4>Shipping Address</h4>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <label>First name</label>
                                <input type="text" placeholder="First name" />
                            </div>
                            <div className="check-out-input-group">
                                <label>Last name</label>
                                <input type="text" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="check-out-input-group">
                            <label>Address</label>
                            <input type="text" placeholder="123 Somewhere Street" />
                        </div>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <label>Country</label>
                                <select>
                                    <option>Please select...</option>
                                    <option>United States</option>
                                    <option>Canada</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>State</label>
                                <select>
                                    <option>Please select...</option>
                                    <option>California</option>
                                    <option>New York</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Zip/Post Code</label>
                                <input type="text" placeholder="ZIP/Postal Code" />
                            </div>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="billing-checkbox" />
                            <label htmlFor="billing-checkbox">Use for billing address</label>
                        </div>
                    </div>

                    <button className="proceed-button">Proceed to shipping</button>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <h4>Order Summary</h4>
                    <div className="items">
                        <div className="item">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="Nike Air VaporMax 2021"
                            />
                            <div>
                                <p>Nike Air VaporMax 2021</p>
                                <p>SIZE: 9 / QTY: 1</p>
                            </div>
                            <p>$85.00</p>
                        </div>
                        <div className="item">
                            <img
                                src="https://via.placeholder.com/50"
                                alt="Nike ZoomX Vaporfly"
                            />
                            <div>
                                <p>Nike ZoomX Vaporfly</p>
                                <p>SIZE: 11 / QTY: 1</p>
                            </div>
                            <p>$125.00</p>
                        </div>
                    </div>
                    <div className="summary">
                        <p>Subtotal: $422.99</p>
                        <p>Shipping: $8.95</p>
                        <p className="total">Grand Total: $422.99</p>
                    </div>
                    <div className="coupon">
                        <input type="text" placeholder="Enter your coupon code" />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;