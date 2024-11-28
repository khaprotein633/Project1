import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Assets/animations/success.json";

const OrderSuccessPage = () => {
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
        <div>
            <Lottie options={defaultOptions} width={300} height={300} />
            <h5 class="order-success">
                Your order is successful 😍
            </h5>
            <br />
            <br />
        </div>
    );
};

export default OrderSuccessPage;