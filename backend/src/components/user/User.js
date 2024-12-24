import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Table, Pagination, Popconfirm, Tooltip, Modal, Button, Input } from 'antd';
import { EyeOutlined, DeleteOutlined, UserAddOutlined, EditOutlined } from '@ant-design/icons';

import UserInfo from './UserInfo';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
    const [listUser, setlistUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [userid, setuserid] = useState('');
    const [userinfoModal, setuserinfoModal] = useState(false);

    const [edituser, setedituser] = useState(null);
    const [editModal, seteditModal] = useState(false);
    const [createModal, setcreateModal] = useState(false);

    useEffect(() => {
        if (!isSearching) {
            fetchUsers(currentPage);
        }
    }, [currentPage, isSearching]);

    const fetchUsers = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/get`, {
                params: { page, size: pageSize },
                headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    Expires: '0',
                },
            });
            setlistUser(res.data.users);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi tải danh sách người dùng!');
        }
    };

    const fetchUsersBySearchTerm = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/search`, {
                params: { search: searchTerm, page, size: pageSize },
                headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    Expires: '0',
                },
            });
            setlistUser(res.data.users);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi tải danh sách người dùng!');
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            toast.info('Vui lòng nhập email hoặc số điện thoại tìm kiếm!');
            return;
        }
        setIsSearching(true); // Đánh dấu đang tìm kiếm
        setCurrentPage(1); // Reset về trang đầu
        fetchUsersBySearchTerm(); // Tìm kiếm người dùng theo email hoặc số điện thoại
    };

    const handleResetSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        fetchUsers(1);
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(`http://localhost:4000/api/user/delete/${_id}`);
            toast.success('Xóa người dùng thành công!');
            fetchUsers(currentPage);
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            toast.error('Lỗi khi xóa người dùng!');
        }
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip title="Xem">
                        <EyeOutlined
                            style={{ color: '#1890ff', cursor: 'pointer' }}
                            onClick={() => {
                                setuserid(record._id);
                                setuserinfoModal(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                setedituser(record);
                                seteditModal(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa người dùng này?"
                            onConfirm={() => handleDelete(record._id)}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <h2>Danh sách người dùng</h2>

            <div style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Tìm kiếm người dùng theo email hoặc số điện thoại"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '250px', marginRight: '10px' }}
                />
                <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px' }}>
                    Tìm kiếm
                </Button>
                <Button onClick={handleResetSearch}>Làm mới</Button>
            </div>

            <Table
                dataSource={listUser}
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
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    size="large"
                    onClick={() => setcreateModal(true)}
                >
                    Thêm người dùng
                </Button>
            </div>

            {/* Modal xem thông tin */}
            <Modal
                title="Thông tin người dùng"
                centered
                open={userinfoModal}
                onOk={() => setuserinfoModal(false)}
                onCancel={() => setuserinfoModal(false)}
            >
                <UserInfo userid={userid} />
            </Modal>

            {/* Modal chỉnh sửa */}
            <Modal
                title="Chỉnh sửa người dùng"
                centered
                open={editModal}
                onCancel={() => seteditModal(false)}
                footer={null}
            >
                <UpdateUser
                    edituser={edituser}
                    onSuccess={() => {
                        seteditModal(false);
                        fetchUsers(currentPage);
                    }}
                />
            </Modal>

            {/* Modal thêm mới */}
            <Modal
                title="Thêm người dùng mới"
                centered
                open={createModal}
                onCancel={() => setcreateModal(false)}
                footer={null}
            >
                <CreateUser
                    onSuccess={() => {
                        setcreateModal(false);
                        fetchUsers(currentPage);
                    }}
                />
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default User;
