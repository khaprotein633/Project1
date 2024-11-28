import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Layout/Header/Navbar'
import "./Cart.scss";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Cart() {
    const [productDetails, setProductDetails] = useState([]);
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cart);
    console.log('check cart',cart)
    const [cartList,setCart] = useState([]);
    const total = 422.99;
    const salesTax = 45.89; 
    useEffect(()=>{
        setCart(cart);
    },[cart])

    useEffect(() => {
        const fetchProductDetails = async () => {
          if (!cart?.items) return; // Nếu cart hoặc cart.items không tồn tại, thoát khỏi hàm
    
          const items = cart.items; // Lấy danh sách items từ giỏ hàng
          try {
            // Gọi API cho từng productId
            const promises = items.map((item) =>
              axios.get(`http://localhost:4000/api/product/get/${item.productId}`)
            );
    
            const responses = await Promise.all(promises);
            console.log('all', responses);
            // Kết quả là một mảng chứa thông tin sản phẩm
            const products = responses.map((response) => response.data.product);
    
            console.log("products", products);
            // Cập nhật danh sách sản phẩm
            setProductDetails(products);
          } catch (error) {
            console.error("Error fetching product details:", error);
          }
        };
    
        fetchProductDetails();
      }, [cart, dispatch]);
      console.log('product', productDetails)
    return (
       productDetails&&  <>
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
                                            SIZE: {item?.inventory[0]?.size} / QTY: {item?.inventory[0]?.quantity}
                                        </p>
                                    </div>
                                    <div className="price">$ {item?.inventory[0]?.price}</div>
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