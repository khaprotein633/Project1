import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import axios from "axios";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Table, Tooltip, Modal, Button, Select, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined , CloseOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';
import OrderDetail from './order/OrderDetail';

const UserProfile = ({ userProps }) => {
    const [Name, setName] = useState(userProps?.name || '');
    const [email, setEmail] = useState(userProps.email || '');
    const [phoneNumber, setPhoneNumber] = useState(userProps.phoneNumber || '');
    const [address, setAddress] = useState(userProps.address || '');
    const [password, setPassword] = useState(userProps.password || '');
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('info');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const [listOrder, setListOrder] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [orderDetailVisible, setOrderDetailVisible] = useState(false);
    

    let formattedDate = '';
    try {
        const date = new Date(userProps?.date_added || Date.now());
        formattedDate = format(date, "dd/MM/yyyy", { locale: vi });
    } catch (error) {
        console.error("Error formatting date:", error);
    }

    useEffect(() => {
        fetchOrders()
    }, [userProps]);

    const handleUpdateProfile = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Profile updated successfully!');
        }, 2000);
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/order/getbyuserid/${userProps._id}`);
            setListOrder(res.data.orders);
            //setTotal(res.data.total);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const handleCancelOrder = async(orderId) => {
        try {
            await axios.put(`http://localhost:4000/api/order/update/${orderId}`, { order_status: 'Đã hủy' });
            toast.success("Trạng thái đơn hàng đã được cập nhật!");
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
                    return new Date(date).toLocaleString();  
                }
                return '-'; 
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
                    {record.order_status !== 'Đã hủy' && ( // Chỉ hiển thị nút hủy khi trạng thái không phải "Đã hủy"
                    <Tooltip title="Hủy đơn hàng">
                        <Popconfirm
                            title="Bạn có chắc muốn hủy đơn hàng này không?"
                            onConfirm={() => handleCancelOrder(record._id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button
                                shape="circle"
                                icon={<CloseOutlined />}
                                style={{ marginRight: 8, color: 'red', cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </Tooltip>
                )}
                </div>
            ),
        },
    ];
    
    const renderTabContent = () => {
        if (activeTab === 'info') {
            return (
                <form className="info-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Account Date</label>
                        <input type="text" value={formattedDate} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                <EyeOutlined />
                            </button>
                        </div>
                    </div>
                </form>
            );
        } else if (activeTab === 'orders') {
            return (
                <div className="orders">
                    <h3>Your Orders</h3>
                    <Table columns={columns} dataSource={listOrder} rowKey="order_id" />
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
                </div>
            );
        }
    };

    return (
        <div className="profile-container">
            <div className="sidebar">
                <h2>User Profile Management</h2>
                <ul>
                    <li className={activeTab === 'info' ? 'active' : ''} onClick={() => setActiveTab('info')}>
                        Personal Info
                    </li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                        View Orders
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <header>
                    <h2>{activeTab === 'info' ? 'Personal Information' : 'Order History'}</h2>
                    {activeTab === 'info' && (
                        <div className="actions">
                            <button onClick={handleUpdateProfile}>Update Profile</button>
                            {isSaving && <span className="status">Saving changes...</span>}
                        </div>
                    )}
                </header>

                <div className="profile-content">{renderTabContent()}</div>

                {activeTab === 'info' && (
                    <div className="delete-account">
                        <h3>Delete Account</h3>
                        <p>
                            After making a deletion request, you will have <strong>6 months</strong> to maintain this
                            account.
                        </p>
                        <p>
                            To permanently erase your whole ProAcc account, click the button below. This implies that
                            you won't have access to your enterprises, accounting, and personal financial data.
                        </p>
                        <button>Delete Account</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
