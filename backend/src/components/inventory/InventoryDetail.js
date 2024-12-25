import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Descriptions, Image, Row, Col, Tag } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';

const InventoryDetail = ({ product_id, inventory_id }) => {
    const [inventory, setInventory] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProduct();
        fetchInventoryDetail();
    }, [product_id, inventory_id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/product/get/${product_id}`);
            setProduct(res.data.product);
        } catch (err) {
            console.log('Error fetching product:', err);
        }
    };

    const fetchInventoryDetail = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                `http://localhost:4000/api/product/${product_id}/inventory/get/${inventory_id}`
            );
            setInventory(res.data.inventory);
        } catch (err) {
            console.error('Error fetching inventory details:', err);
            setError('Không thể tải thông tin inventory. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" tip="Đang tải thông tin inventory..." />
            </div>
        );
    }

    if (error) {
        return <Alert message="Lỗi" description={error} type="error" showIcon />;
    }

    if (!inventory || !product) {
        return <Alert message="Thông báo" description="Không tìm thấy thông tin." type="warning" showIcon />;
    }

    return (
        <Card
            title={`Chi tiết Sản phẩm: ${product_id}`}
            style={{
                maxWidth: 800,
                margin: '0 auto',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
            extra={<Tag color="geekblue">{inventory.status}</Tag>}
        >
            <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
                    <Image width={200} src={inventory.image_url} alt={product.product_name} style={{ borderRadius: '8px' }} />
                </Col>
                <Col xs={24} sm={12}>
                    <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
                        <Descriptions.Item label="Mã tồn kho">{inventory._id}</Descriptions.Item>
                        <Descriptions.Item label="Tên Sản Phẩm">{product.product_name}</Descriptions.Item>
                        <Descriptions.Item label="Giá Bán">
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                <DollarCircleOutlined style={{ marginRight: '8px' }} />
                                {inventory.price.toLocaleString()} VND
                            </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Size">{inventory.size}</Descriptions.Item>
                        <Descriptions.Item label="Màu Sắc">{inventory.color}</Descriptions.Item>
                       
                    </Descriptions>
                </Col>
            </Row>
        </Card>
    );
};

export default InventoryDetail;
