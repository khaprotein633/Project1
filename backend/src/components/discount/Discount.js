import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, DatePicker, Tooltip,Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import CreateDiscount from './CreateDiscount';
import { toast } from 'react-toastify';
import EditDiscount from './EditDiscount';

const { RangePicker } = DatePicker;

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);



  const [loading, setLoading] = useState(false);
  const [CreateDiscountVisible, setCreateDiscountVisible] = useState(false);

  
  const [discount_id, setDiscount_id] = useState('');
  const [EditDiscountVisible, setEditDiscountVisible] = useState(false);

  // Lấy danh sách mã giảm giá
  useEffect(() => {
    fetchDiscounts(currentPage);
  }, [currentPage]);

  const fetchDiscounts = async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:4000/api/discount/get?page=${page}&size=${pageSize}`);
      setDiscounts(res.data.discounts);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching discounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
        await axios.delete(`http://localhost:4000/api/discount/delete/${_id}`);
        fetchDiscounts(currentPage);
        toast.success("Xóa mã giảm giá thành công!")
    } catch (error) {
        toast.success("Lỗi khi xóa ")
        console.error("Lỗi khi xóa:", error);
    }
};
  // Cấu hình bảng
  const columns = [
    {
      title: 'Tên giảm giá',
      dataIndex: 'discount_name',
      key: 'discount_name',
    },
    {
      title: 'Phần trăm giảm',
      dataIndex: 'discount_percentage',
      key: 'discount_percentage',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip title="Chỉnh sửa">
                        <EditOutlined
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                                setDiscount_id(record._id)
                                setEditDiscountVisible(true);
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
    <div>
      
      <Table
        columns={columns}
        dataSource={discounts}
        loading={loading}
        rowKey="_id"
      />
      <div className="d-flex justify-content-center mt-3">
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setCreateDiscountVisible(true)}>
                    Thêm mã giảm giá
                </Button>
            </div>
      <Modal
        title={'Thêm mã giảm giá'}
        open={CreateDiscountVisible}
        onCancel={()=>setCreateDiscountVisible(false)}
        footer={null}
      >
        <CreateDiscount 
        onSuccess={() => {
            setCreateDiscountVisible(false);
            fetchDiscounts();
        }}/>
      </Modal>

      <Modal
        title={'Cập nhật mã giảm giá'}
        open={EditDiscountVisible}
        onCancel={()=>setEditDiscountVisible(false)}
        footer={null}
      >
        <EditDiscount  discount_id={discount_id}
        onSuccess={() => {
            setEditDiscountVisible(false);
            fetchDiscounts();
        }}/>
      </Modal>
    </div>
  );
};

export default Discounts;
