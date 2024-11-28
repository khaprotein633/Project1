import React, { useEffect, useState } from "react";
import "./PaymentPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUserId } from "../../Redux/actions/cart";
import { formatCurrency } from "../../utils/formatCurrency";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { server } from "../../Config/server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const PaymentPage = () => {
    // State for payment information form
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);



    const handleApplyDiscount = () => {
        if (discountCode) {
            setIsDiscountApplied(true);
        }
    };


    // State for contact information form
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
    const [paymentMethod, setPaymentMethod] = useState("card");
    const handlePaymentChange = (method) => setPaymentMethod(method);
    const salesTax = 45.89;
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    // Update cartList state only when cart is loaded and available
    const [cartList, setCartList] = useState(cart || []);
    // Handle form submissions or updates (example for newsletter)
    const handleNewsletterChange = (event) => {
        setNewsletter(event.target.checked);
    };

    const handleBillingCheckboxChange = (event) => {
        setUseBillingAddress(event.target.checked);
    };

    const paymentData = {
        amount: Math.round(totalPrice),
    };
    const handleSubmit = async (event) => {
        if (paymentMethod === "card") {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                console.log(paymentData);

                const { data } = await axios.post(
                    `${server}/payment/process`,
                    paymentData,
                    config
                );

                const client_secret = data.client_secret;
                console.log('client', client_secret);
                console.log('stripe', stripe);
                console.log('elements', elements);

                if (!stripe || !elements) return;
                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                    },
                });

                if (result.error) {
                    console.log('error', result.error);
                    toast.error(result.error.message);
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        // order.paymnentInfo = {
                        //     id: result.paymentIntent.id,
                        //     status: result.paymentIntent.status,
                        //     type: "Credit Card",
                        // };

                        // await axios
                        //     .post(`${server}/order/create-order`, order, config)
                        //     .then((res) => {
                        //         setOpen(false);
                        //         navigate("/order/success");
                        //         toast.success("Order successful!");
                        //         localStorage.setItem("cartItems", JSON.stringify([]));
                        //         localStorage.setItem("latestOrder", JSON.stringify([]));
                        //         window.location.reload();
                        //     });
                        toast.success("order successfully")
                    }
                }
            } catch (error) {
                console.log('error', error);

                toast.error(error);
            }
        }
        event.preventDefault();
        // Handle form submission logic
        // console.log({
        //     firstName,
        //     lastName,
        //     email,
        //     newsletter,
        //     address,
        //     country,
        //     state,
        //     zipCode,
        //     useBillingAddress,
        // });
    };


    useEffect(() => {
        if (user) {
            // Fetch cart data if user is logged in
            dispatch(getCartByUserId(user._id));
        }
        // Retrieve data from localStorage
        const savedUserData = JSON.parse(localStorage.getItem("userOrderData"));
        if (savedUserData) {
            // console.log('local', savedUserData)
            setOrderData(savedUserData);

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
        <div className="payment-page">
            <div className="payment-content">
                <div className="form-section">
                    <div className="breadcrumb">
                        <p>
                            <span>Your Cart</span> &gt; <span>Information</span> &gt;{" "}
                            <span>Shipping</span> &gt; <strong><span>Payment</span></strong>
                        </p>
                    </div>
                    <div className="info-table">
                        <table>
                            <tbody>

                                <tr>
                                    <td className="label">Email</td>
                                    <td className="value">{orderData.email}</td>
                                    <td className="label action">
                                        <button>
                                            Change
                                        </button>
                                    </td>

                                </tr>
                                <tr>
                                    <td className="label">Address</td>
                                    <td className="value">{orderData.address}, {orderData.state}, {orderData.country}</td>
                                    <td className="label action">
                                        <button>
                                            Change
                                        </button>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>


                    {/* Contact Information Form */}
                    <div className="contact-information-form">
                        <div className="payment-form-group">
                            <section className="payment-section">
                                <h2>Payment Information</h2>
                                <div>
                                    <div className="payment-method">
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={() => handlePaymentChange("card")}
                                            />
                                            Credit Card (Stripe)
                                            <span className="icon">
                                                <i className="fas fa-credit-card"></i>
                                            </span>
                                        </label>
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="paypal"
                                                checked={paymentMethod === "paypal"}
                                                onChange={() => handlePaymentChange("paypal")}
                                            />
                                            PayPal
                                            <span className="icon">
                                                <i className="fab fa-paypal"></i>
                                            </span>
                                        </label>

                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="cash"
                                                value="cash"
                                                checked={paymentMethod === "cash"}
                                                onChange={() => handlePaymentChange("cash")}
                                            />
                                            Cash
                                            <span className="icon">
                                                <i className="fab fa-paypal"></i>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Conditional content for PayPal */}
                                    {paymentMethod === "paypal" && (
                                        <div className="paypal-info">
                                            Please click on complete order. You will then be transferred to
                                            PayPal to enter your payment details.
                                        </div>
                                    )}
                                    {paymentMethod === "cash" && (
                                        <div className="paypal-info">
                                            Please click on complete order.
                                        </div>
                                    )}


                                    {/* Form fields for Credit Card */}
                                    {paymentMethod === "card" && (
                                        <>

                                            <div className="payment-form-group">
                                                <div className="input-group">
                                                    <label>Name on card</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Full name as displayed on card"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Credit card number</label>
                                                    <CardNumberElement
                                                        className="card-payment"
                                                    />
                                                </div>
                                            </div>

                                            <div className="payment-form-group">
                                                <div className="input-group">
                                                    <label>Expiration</label>
                                                    <CardExpiryElement className="card-payment"

                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>
                                                        Security Code <a href="/">What's this?</a>
                                                    </label>
                                                    <CardCvcElement

                                                        className="card-payment"
                                                    />

                                                </div>
                                            </div>

                                        </>
                                    )}

                                    <div className="terms">
                                        <input type="checkbox" id="terms" />
                                        <label htmlFor="terms">
                                            I agree to OldSkool's <a href="/">terms & conditions</a>
                                        </label>
                                    </div>

                                    <div className="form-actions">
                                        <a href="/" className="back-link">
                                            Back to shipping
                                        </a>
                                        <button onClick={handleSubmit} className="complete-order-btn">
                                            Complete Order
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
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

                            {formatCurrency(totalPrice + salesTax)}


                        </p>
                        <p>Shipping:
                            {formatCurrency(30000)}

                        </p>
                        <p className="total">Grand Total:
                            {formatCurrency(totalPrice + salesTax + 8.95)}

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

export default PaymentPage;


