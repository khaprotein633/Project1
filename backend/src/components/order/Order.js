import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Popconfirm, Tooltip, Modal, Button, Image } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined, EditOutlined, StockOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import OrderDetail from './orderdetail/OrderDetail';

const Order = () => {
    const [listOrder, setListOrder] = useState([]);
    const [statusList, setStatusList] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [sortOrder, setSortOrder] = useState('descend');

    const [orderid,setorderid]= useState('');
    const [orderdetail,setorderdetail] = useState(false);

    useEffect(() => {
        fetchStatus(); 
        fetchOrder(currentPage);
        console.log(statusList);
    }, [currentPage, sortOrder]);

    const fetchStatus = ()=>{
        const listStatus = ["Đang chờ xử lý","Đã duyệt","Đang giao","Đã giao","Đã hủy"];
        setStatusList(listStatus);
    }

    const fetchOrder = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/order/get?page=${page}&size=${pageSize}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setListOrder(res.data.list);
            setTotal(res.data.total);
        } catch (err) {
            console.log(err);
        }
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        setSortOrder(sorter.order === 'ascend' ? 'ascend' : 'descend');
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
            title: 'Status',
            dataIndex: 'order_status',
            key: 'order_status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Tooltip title="View">
                        <Button shape="circle" icon={<EyeOutlined />} 
                        style={{ marginRight: 8 }}
                         onClick={() => {
                            setorderid(record._id)
                            console.log(orderid)
                                setorderdetail(true);
                            }}/>
                    </Tooltip>
                    <Tooltip title="Update">
                        <Button shape="circle" icon={<EditOutlined />} style={{color:"blue" , marginRight: 8 }} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Popconfirm
                            title="Are you sure to delete this order?"
                            onConfirm={() => handleDelete(record.order_id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button shape="circle" icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:4000/api/order/delete/${orderId}`);
            toast.success("Order deleted successfully!");
            fetchOrder();
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error("Failed to delete order!");
        }
    };

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
                open={orderdetail}
                onCancel={() => {
                    setorderdetail(false);
                    
                }}
                onOk={() => {
                    setorderdetail(false);
                   
                }}
                width={1000}
            >
                <OrderDetail order_id={orderid} />
            </Modal>
        </div>



    );
};

export default Order;
