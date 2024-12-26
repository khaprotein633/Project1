import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Layout/Header/Navbar'
import "./Cart.scss";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCartByUserId, updateCartItem } from '../Redux/actions/cart';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [productDetails, setProductDetails] = useState([]);
    const { allProducts } = useSelector((state) => state.product);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const [totalPrice, setTotalPrice] = useState();
    const navigate = useNavigate()
    const salesTax = 45.89;

    // Update cartList state only when cart is loaded and available
    const [cartList, setCartList] = useState(cart || []);
    const handleCheckout = () => {
        navigate("/checkout")
    }
    useEffect(() => {
        if (user) {
            // Fetch cart data if user is logged in
            dispatch(getCartByUserId(user._id));
        }
    }, [user, dispatch]); // Only run when user changes or is authenticated
    const updateQuantity = (inventoryId, action) => {

        const newQuantity = action === 'increase' ? 1 : -1;
        const userId = user?._id;
        console.log(userId);
        const data = {
            userId,
            quantity: newQuantity
        }
        dispatch(updateCartItem(inventoryId, data)).then(() => {
            dispatch(getCartByUserId(user._id));
        })

    };
    useEffect(() => {
        // Only update cartList when cart data is available
        if (cart?.items) {
            setCartList(cart);
        }
    }, [cart]); // Run only when cart is updated

    useEffect(() => {
        if (cartList?.items && allProducts?.length > 0) {
            const cartProducts = cartList.items.map((cartItem) => {
                const product = allProducts.find((p) => p._id === cartItem.productId);
                const inventory = product.inventory.find((i) => i._id === cartItem.inventoryId);

                return {
                    _id: cartItem._id,
                    inventoryId: inventory._id,
                    size: inventory.size,
                    color: inventory.color,
                    price: inventory.price,
                    quantity: cartItem.quantity,
                    category_id: product.category_id,
                    product_name: product.product_name,
                    brand_id: product.brand_id,
                    description: product.description,
                    detail: product.detail,
                    main_image: product.main_image,
                    images: product.images,
                    hide: product.hide,
                    date_added: product.date_added,
                    date_updated: product.date_updated,
                };
            });
            setProductDetails(cartProducts);
            const totalPrice = productDetails.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0)
            setTotalPrice(totalPrice);
        }
    }, [cartList, allProducts]); // Only run when cartList or allProducts change

    // Loading state if cart or product details are missing
    useEffect(() => {

    }, [cart])

    return (
        cart && <>
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
                            {productDetails?.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item?.main_image} alt={item.name} />
                                    <div className="details">
                                        <h5>{item?.product_name}</h5>
                                        <p>
                                            SIZE: {item?.size} / DESIGN: {item?.color}
                                        </p>
                                    </div>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item._id, 'decrease')}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, 'increase')}>+</button>
                                    </div>
                                    <div className="price">
                                        {parseInt(item?.price).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })} x {item.quantity}

                                    </div>
                                    <button className="remove-btn">&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="cart-right">
                        <h4>Grand Total</h4>
                        <p>Inc ${salesTax.toFixed(2)} sales tax</p>
                        <h2>  {parseInt(totalPrice).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}</h2>
                        <div className="coupon">
                            <input type="text" placeholder="Enter coupon code" />
                            <button>Apply</button>
                        </div>
                        <button onClick={handleCheckout} className="checkout-btn">Proceed to checkout</button>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Cart

