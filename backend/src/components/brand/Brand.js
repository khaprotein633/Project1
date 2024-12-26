import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Pagination, Popconfirm, Tooltip, Modal, Button, Image, Input } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import CreateBrand from './CreateBrand';
import UpdateBrand from './UpdateBrand';

const Brand = () => {
    const [listBrand, setListBrand] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [createBrandVisible, setCreateBrandVisible] = useState(false);
    const [editBrandVisible, setEditBrandVisible] = useState(false);
    const [brandId, setBrandId] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (!isSearching) {
            fetchBrands(currentPage);
        }
    }, [currentPage, isSearching]);

    const fetchBrands = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/brand/get?page=${page}&size=${pageSize}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setListBrand(res.data.brands);
            setTotal(res.data.total);
        } catch (err) {
            console.error('Error fetching brands:', err);
        }
    };

    const fetchBrandName = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/brand/getbyname/${searchBrand}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setListBrand(res.data.brand);
            setTotal(res.data.brand.length); // Cập nhật tổng số kết quả tìm kiếm
            setIsSearching(true);
        } catch (err) {
            console.error('Error fetching brands:', err);
        }
    };

    const handleSearch = () => {
        if (searchBrand.trim() === '') {
            toast.info('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }
        setCurrentPage(1); // Reset về trang đầu
        fetchBrandName();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/brand/delete/${id}`);
            toast.success('Xóa thương hiệu thành công!');
            fetchBrands(1);
        } catch (err) {
            console.error('Error deleting brand:', err);
            toast.error('Có lỗi xảy ra khi xóa thương hiệu!');
        }
    };

    const handleResetSearch = () => {
        setSearchBrand('');
        setIsSearching(false);
        fetchBrands(1);
    };

    const columns = [
        {
            title: 'LOGO',
            dataIndex: 'brand_logo_url',
            render: (logoUrl) => <Image style={{ width: 50, height: 50 }} src={logoUrl} />,
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'brand_name',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                setBrandId(record._id);
                                setEditBrandVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa thương hiệu này?"
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
            <h2>Danh sách thương hiệu</h2>

            {/* Tìm kiếm thương hiệu */}
            <div style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Tìm kiếm thương hiệu"
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                    style={{ width: '250px', marginRight: '10px' }}
                />
                <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
                    Tìm kiếm
                </Button>
                <Button onClick={handleResetSearch}>Làm mới</Button>
            </div>

            {/* Bảng danh sách thương hiệu */}
            <Table
                columns={columns}
                dataSource={listBrand}
                rowKey="_id"
                pagination={false}
            />

            {/* Phân trang */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: '20px', textAlign: 'right' }}
            />

            {/* Thêm thương hiệu */}
            <div className="d-flex justify-content-center mt-3">
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setCreateBrandVisible(true)}>
                    Thêm thương hiệu
                </Button>
            </div>

            {/* Modal Thêm thương hiệu */}
            <Modal
                title="Thêm thương hiệu"
                centered
                open={createBrandVisible}
                onCancel={() => setCreateBrandVisible(false)}
                footer={null}
            >
                <CreateBrand onSuccess={() => { setCreateBrandVisible(false); fetchBrands(currentPage); }} />
            </Modal>

            {/* Modal Chỉnh sửa thương hiệu */}
            <Modal
                title="Chỉnh sửa thương hiệu"
                centered
                open={editBrandVisible}
                onCancel={() => setEditBrandVisible(false)}
                footer={null}
            >
                <UpdateBrand brandId={brandId} onSuccess={() => { setEditBrandVisible(false); fetchBrands(currentPage); }} />
            </Modal>
        </div>
    );
};

export default Brand;
