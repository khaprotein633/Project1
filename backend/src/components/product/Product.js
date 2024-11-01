import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Table, Pagination, Popconfirm, Tooltip, Modal, Button } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

//import ProductInfo from './ProductInfo';
import CreateProduct from './CreateProduct';

const Product = () => {
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [productId, setProductId] = useState('');
    const [productInfoVisible, setProductInfoVisible] = useState(false);
    const [createProductVisible, setCreateProductVisible] = useState(false);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/product/get?page=${page}&size=${pageSize}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setListProduct(res.data.products);
            setTotal(res.data.total);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:4000/api/product/delete/${_id}`);
            fetchProducts(currentPage);
            console.log("Xóa sản phẩm thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'product_img',
            key: 'product_img',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand_name', // Giả sử bạn đã lấy thông tin thương hiệu kèm theo
            key: 'brand_name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} VND`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip title="Xem">
                        <EyeOutlined
                            style={{ color: '#1890ff', cursor: 'pointer' }}
                            onClick={() => {
                                setProductInfoVisible(true);
                                setProductId(record._id);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                            onConfirm={() => handleDelete(record._id)}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined
                                style={{ color: 'red', cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>Danh sách sản phẩm</h2>
            <Table
                dataSource={listProduct}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 16 }}
            />

            <div className="d-flex justify-content-center mt-3">
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setCreateProductVisible(true)}>
                    Thêm sản phẩm
                </Button>
            </div>

            <Modal
                title="Thông tin sản phẩm"
                centered
                open={productInfoVisible}
                onOk={() => setProductInfoVisible(false)}
                onCancel={() => setProductInfoVisible(false)}
            >
                {/* <ProductInfo productId={productId} /> */}
            </Modal>

            <Modal
                title="Thêm sản phẩm"
                centered
                open={createProductVisible}
                onCancel={() => setCreateProductVisible(false)}
                footer={null}
            >
                <CreateProduct
                    onSuccess={() => {
                        setCreateProductVisible(false);
                        fetchProducts();
                    }}
                />
            </Modal>
        </div>
    );
};

export default Product;
