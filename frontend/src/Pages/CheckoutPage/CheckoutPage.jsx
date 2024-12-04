import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUserId } from "../../Redux/actions/cart";
import { formatCurrency } from "../../utils/formatCurrency";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const CheckoutPage = () => {
    // State for contact information form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [newsletter, setNewsletter] = useState(false);

    // State for shipping address form
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("Please select...");
    const [state, setState] = useState("Please select...");
    const [zipCode, setZipCode] = useState("");
    const [useBillingAddress, setUseBillingAddress] = useState(false);

    // State for order summary (can be updated later if needed)
    const [couponCode, setCouponCode] = useState("");
    const [productDetails, setProductDetails] = useState([]);
    const { allProducts } = useSelector((state) => state.product);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const [totalPrice, setTotalPrice] = useState();
    const navigate = useNavigate();  // Get navigate function

    const salesTax = 45.89;

    // Update cartList state only when cart is loaded and available
    const [cartList, setCartList] = useState(cart || []);
    // Handle form submissions or updates (example for newsletter)
    const handleNewsletterChange = (event) => {
        setNewsletter(event.target.checked);
    };

    const handleBillingCheckboxChange = (event) => {
        setUseBillingAddress(event.target.checked);
    };

        const handleSubmit = (event) => {
            event.preventDefault();


            const orderData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                newsletter: newsletter,
                address:address,
                country: country,
                state: state,
                zipCode: zipCode,
                useBillingAddress: useBillingAddress
            };

            localStorage.setItem("userOrderData", JSON.stringify(orderData));

            navigate("/payment");  // Use navigate to route to /payment

        };


    useEffect(() => {
        if (user) {
            // Fetch cart data if user is logged in
            dispatch(getCartByUserId(user._id));
        }
    }, [user, dispatch]); // Only run when user changes or is authenticated

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
                    _id: product._id,
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
            const totalPrice = cartProducts.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0)
            setTotalPrice(totalPrice);
        }
    }, [cartList, allProducts]); // Only run when cartList or allProducts change

    // Loading state if cart or product details are missing
    if (!cart || !cart.items || productDetails.length === 0) {
        return <div>Loading cart...</div>;
    }


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
                                <input
                                    type="text"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <div>Email</div>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <div>Phone Number</div>
                                <input
                                    type="phoneNumber"
                                    placeholder="097789789"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="check-out-checkbox">
                            <input
                                type="checkbox"
                                id="newsletter"
                                checked={newsletter}
                                onChange={handleNewsletterChange}
                            />
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
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Country</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                >
                                    <option>Please select...</option>
                                    <option>Viet Nam</option>
                                    <option>United States</option>
                                </select>
                            </div>
                        </div>
                        <div className="check-out-form-group">
                            <div className="input-group">
                                <label>State</label>
                                <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option>Please select...</option>
                                    <option>Thủ Đức</option>
                                    <option>Quận 9</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Zip/Post Code</label>
                                <input
                                    type="text"
                                    placeholder="ZIP/Postal Code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                id="billing-checkbox"
                                checked={useBillingAddress}
                                onChange={handleBillingCheckboxChange}
                            />
                            <label htmlFor="billing-checkbox">Use for billing address</label>
                        </div>
                    </div>

                    <button className="proceed-button" onClick={handleSubmit}>
                        Proceed to shipping
                    </button>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <h4>Order Summary</h4>
                    {/* Loop through productDetails */}
                    {productDetails.map((product, index) => (
                        <div className="items">
                            <div key={index} className="item">
                                <img
                                    src={product.main_image || "https://via.placeholder.com/50"}
                                    alt={product.product_name}
                                />
                                <div>
                                    <p>{product.product_name}</p>
                                    <p>SIZE: {product.size} / COLOR: {product.color}</p>
                                </div>
                                <p>
                                    {formatCurrency(product.price * product.quantity)} x {product.quantity}

                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="summary">
                        <p>Subtotal:

                            {formatCurrency(totalPrice)} 


                        </p>
                        <p>Shipping:
                        {formatCurrency(30000)} 

                        </p>
                        <p className="total">Grand Total:                             
                        {formatCurrency(totalPrice + 30000)} 

                        </p>
                    </div>
                    <div className="coupon">
                        <input
                            type="text"
                            placeholder="Enter your coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button>Apply</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;


