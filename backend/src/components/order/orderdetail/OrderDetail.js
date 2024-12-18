import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Card, Spin } from 'antd';

const OrderDetail = ({ order_id }) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (order_id) {
            fetchOrderDetail();
        }
    }, [order_id]);

    const fetchOrderDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/order/get/${order_id}`);
            setOrderDetail(res.data.order);
        } catch (error) {
            console.error('Error fetching order details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin tip="Loading order details..." />;
    }

    return (
        <Card>
            {orderDetail ? (
                <div>
                    <p><strong>Order ID:</strong> {orderDetail._id}</p>
                    <p><strong>User ID:</strong> {orderDetail.user_id}</p>
                    <p><strong>Total Amount:</strong> {orderDetail.total_amount.toLocaleString()} VND</p>
                    <p><strong>Order Date:</strong> {new Date(orderDetail.orders_date).toLocaleString()}</p>
                    <p><strong>Status:</strong> {orderDetail.order_status}</p>

                    <List
                        header={<strong>Products</strong>}
                        bordered
                        dataSource={orderDetail.order_details}
                        renderItem={(item) => (
                            <List.Item>
                                <strong>Product ID:</strong> {item.product_id}, 
                                <strong>Quantity:</strong> {item.quantity}, 
                               {/* <strong>Price:</strong> {item.price.toLocaleString()} VND */}
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <p>No details available for this order.</p>
            )}
        </Card>
    );
};

export default OrderDetail;
