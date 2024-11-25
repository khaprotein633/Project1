import React from 'react'
import Navbar from '../Components/Layout/Header/Navbar'
import "./Cart.scss";

function Cart() {
    const cartItems = [
        {
            id: 1,
            name: "Nike Air VaporMax 2021",
            size: 9,
            qty: 1,
            price: 85.0,
            image:
                "https://via.placeholder.com/100", // Replace with your image URL
        },
        {
            id: 2,
            name: "Nike ZoomX VaporFly",
            size: 11,
            qty: 1,
            price: 125.0,
            image:
                "https://via.placeholder.com/100", // Replace with your image URL
        },
    ];

    const total = 422.99; // Replace with dynamic total calculation
    const salesTax = 45.89; // Replace with dynamic tax calculation
    return (
        <>
            <Navbar />
            <div className="cart-page">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <p>
                        <span>Your Cart</span> &gt; <span>Information</span> &gt;{" "}
                        <span>Shipping</span> &gt; <span>Payment</span>
                    </p>
                </div>

                <div className="cart-content">
                    {/* Left Section */}
                    <div className="cart-left">
                        <h4>Your Cart</h4>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="details">
                                        <h5>{item.name}</h5>
                                        <p>
                                            SIZE: {item.size} / QTY: {item.qty}
                                        </p>
                                    </div>
                                    <div className="price">${item.price.toFixed(2)}</div>
                                    <button className="remove-btn">&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="cart-right">
                        <h4>Grand Total</h4>
                        <p>Inc ${salesTax.toFixed(2)} sales tax</p>
                        <h2>${total.toFixed(2)}</h2>
                        <div className="coupon">
                            <input type="text" placeholder="Enter coupon code" />
                            <button>Apply</button>
                        </div>
                        <button className="checkout-btn">Proceed to checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart