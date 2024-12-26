import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tooltip, Modal, Button, Select, Popconfirm } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import OrderDetail from '../orderdetail/OrderDetail';

const { Option } = Select;

const Order = () => {
    const [listOrder, setListOrder] = useState([]);
    const [statusList] = useState(["Đang chờ xử lý", "Đã duyệt", "Đang giao", "Đã giao", "Đã hủy"]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [sortOrder, setSortOrder] = useState('descend');

    const [orderId, setOrderId] = useState('');
    const [orderDetailVisible, setOrderDetailVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchOrders(currentPage, sortOrder);
    }, [currentPage, sortOrder]);

    const fetchOrders = async (page = currentPage, sort = sortOrder) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/order/get?page=${page}&size=${pageSize}`);
            setListOrder(res.data.list);
            setTotal(res.data.total);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        setSortOrder(sorter.order === 'ascend' ? 'ascend' : 'descend');
    };

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:4000/api/order/delete/${orderId}`);
            toast.success("Đơn hàng đã được xóa!");
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error("Xóa đơn hàng thất bại!");
        }
    };

    const handleEditStatus = async () => {
        try {
            await axios.put(`http://localhost:4000/api/order/update/${orderId}`, { order_status: newStatus });
            toast.success("Trạng thái đơn hàng đã được cập nhật!");
            setEditModalVisible(false);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error("Cập nhật trạng thái thất bại!");
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: (amount) => `${amount.toLocaleString()} VND`,
        },
        {
            title: 'Order Date',
            dataIndex: 'orders_date',
            key: 'orders_date',
            sorter: true,
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Delivery Date',
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            sorter: true,
            render: (date) => {
                if (date) {
                    return new Date(date).toLocaleString();  // Chuyển đổi ngày thành chuỗi theo múi giờ của người dùng
                }
                return '-';  // Trả về dấu "-" nếu không có ngày
            }
        },
        {
            title: 'Status',
            dataIndex: 'order_status',
            key: 'order_status'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Tooltip title="Xem Chi tiết">
                        <Button
                            shape="circle"
                            icon={<EyeOutlined />}
                            style={{ marginRight: 8 }}
                            onClick={() => {
                                setOrderId(record._id);
                                setOrderDetailVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ marginRight: 8, color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                setOrderId(record._id);
                                setNewStatus(record.order_status); // Set current status for editing
                                setEditModalVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa đơn hàng">
                        <Popconfirm
                            title="Bạn có chắc muốn xóa đơn hàng này không?"
                            onConfirm={() => handleDelete(record._id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button shape="circle" icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={listOrder}
                rowKey="_id"
                pagination={{ current: currentPage, pageSize, total }}
                onChange={handleTableChange}
                bordered
            />
            <Modal
                title="Chi tiết đơn hàng"
                centered
                open={orderDetailVisible}
                onCancel={() => setOrderDetailVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setOrderDetailVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={1000}
            >
                <OrderDetail order_id={orderId} />
            </Modal>

            <Modal
                title="Duyệt đơn hàng"
                centered
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={handleEditStatus}
                width={400}
            >
                <Select
                    defaultValue={newStatus}
                    style={{ width: '100%' }}
                    onChange={(value) => setNewStatus(value)}
                >
                    {statusList.map((status, index) => (
                        <Option key={index} value={status}>{status}</Option>
                    ))}
                </Select>
            </Modal>
        </div>
    );
};

export default Order;
