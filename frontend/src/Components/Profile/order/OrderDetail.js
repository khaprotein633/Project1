import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Card, Spin, Alert } from 'antd';
import InventoryDetail from './InventoryDetail';

const OrderDetail = ({ order_id }) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (order_id) {
            console.log('id đơn hàng:',order_id)
            fetchOrderDetail();
        }
    }, [order_id]);

    const fetchOrderDetail = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:4000/api/order/get/${order_id}`);
            setOrderDetail(res.data.order);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setError('Không thể tải chi tiết đơn hàng. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin tip="Đang tải chi tiết đơn hàng..." />;
    }

    if (error) {
        return <Alert message="Lỗi" description={error} type="error" showIcon />;
    }

    return (
        <Card>
            {orderDetail ? (
                <div>
                    <p><strong>Mã đơn hàng:</strong> {orderDetail._id}</p>
                    <p><strong>Mã khách hàng:</strong> {orderDetail.user_id}</p>
                    <p><strong>Tổng tiền:</strong> {orderDetail.total_amount.toLocaleString()} VND</p>
                    <p><strong>Ngày đặt:</strong> {new Date(orderDetail.orders_date).toLocaleString()}</p>
                    <p><strong>Trạng thái:</strong> {orderDetail.order_status}</p>

                    <List
                        header={<strong>Sản phẩm trong đơn hàng</strong>}
                        bordered
                        dataSource={orderDetail.order_details}
                        renderItem={(item) => (
                            <List.Item>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    
                                    <InventoryDetail product_id={item.product_id} inventory_id={item.inventory_id}/>
                                    <div>
                                        <p><strong>Số lượng:</strong> {item.quantity}</p>
                                    </div>
                                </div>

                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <p>Không tìm thấy thông tin chi tiết cho đơn hàng này.</p>
            )}
        </Card>
    );
};

export default OrderDetail;
