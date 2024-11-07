import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Table, Pagination, Popconfirm, Tooltip, Modal, Button, Image } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined, EditOutlined, StockOutlined } from '@ant-design/icons';

import CreateProduct from './CreateProduct';
import ProductInfo from './ProductInfo';
import { toast } from 'react-toastify';
import UpdateProduct from './UpdateProduct';
import Inventory from '../inventory/Inventory';

const Product = () => {
    const [listProduct, setListProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [productId, setProductId] = useState('');
    const [productInfoVisible, setProductInfoVisible] = useState(false);

    const [createProductVisible, setCreateProductVisible] = useState(false);

    const [editproduct, seteditproduct] = useState(null);
    const [editform, seteditform] = useState(false);

    const [editInventory, setEditInventory] = useState(false);


    useEffect(() => {
        setProductId('');
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
            toast.success("Xóa sản phẩm thành công!")
        } catch (error) {
            toast.success("Lỗi khi xóa sản phẩm")
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
            dataIndex: 'main_image',
            key: 'main_image',
            render: (text) => (
                <Image
                    style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                    src={text}
                />

            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'detail',
            key: 'detail',
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
                                setProductId(record._id);
                                setProductInfoVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                seteditproduct(record);
                                seteditform(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Quản lý tồn kho">
                        <StockOutlined
                            style={{ color: 'green', cursor: 'pointer' }}
                            onClick={() => {
                                setProductId(record._id); 
                                setEditInventory(true);  
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
                align='end'
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
                onClose={() => {
                    setProductInfoVisible(false)
                    setProductId('')
                }}
                onOk={() => {
                    setProductInfoVisible(false)
                    setProductId('')
                }}
                onCancel={() => {
                    setProductInfoVisible(false)
                    setProductId('')
                }}
            >
                <ProductInfo productId={productId} />
            </Modal>

            <Modal
                title="Hàng tồn kho"
                centered
                open={editInventory}
                onCancel={() => {
                    setEditInventory(false);
                    
                }}
                onOk={() => {
                    setEditInventory(false);
                   
                }}
                width={1000}
            >
                <Inventory product_id={productId} />
            </Modal>


            <Modal
                title="Chỉnh sửa sản phẩm"
                centered
                open={editform}
                onClose={() => {seteditform(false)
                    seteditproduct(null)
                }}
                onOk={() => seteditform(false)}
                onCancel={() => seteditform(false)}
            >
                <UpdateProduct editproduct={editproduct} onSuccess={() => {
                    seteditform(false);
                    fetchProducts();
                }} />
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
