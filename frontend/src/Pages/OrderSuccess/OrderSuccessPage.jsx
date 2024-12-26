import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../Assets/animations/success.json";
import "./OrderSuccessPage.scss";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Chuyển hướng về trang chủ sau 5 giây
    const timer = setTimeout(() => {
      navigate("/"); // Điều hướng về trang chủ
    }, 5000);

    // Xóa timer nếu component bị hủy
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Success />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="order-container">
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="order-success">Your order is successful 😍</h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
