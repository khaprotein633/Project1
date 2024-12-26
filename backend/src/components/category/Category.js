import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Popconfirm, Tooltip, Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create_category from './Create_category';
import UpdateCategory from './UpdateCategory';

const Category = () => {
  const [listcategories, setlistcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [create_category, setcreate_category] = useState(false);
  const [editform, seteditform] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategory(currentPage);
    
  }, [currentPage]);

  const fetchCategory = async (page = currentPage) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/category/get?page=${page}&size=${pageSize}`);
      setlistcategories(res.data.list);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Lỗi khi tải danh mục:", err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/category/delete/${_id}`);
      toast.success('Xóa thành công!');
      fetchCategory(currentPage);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };


  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => {
                setEditCategory(record);
                seteditform(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa danh mục này?"
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
      <h2>Danh mục</h2>
      <Table
        dataSource={listcategories}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      <Pagination
      align="end"
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16 }}
      />
      <div className="d-flex justify-content-center mt-3">
        <Button type="primary" size="large" onClick={() => setcreate_category(true)}>ADD CATEGORY</Button>
      </div>
      <Modal
        title="Create Category"
        centered
        open={create_category}
        onCancel={() => setcreate_category(false)}
        footer={null}
      >
        <Create_category onSuccess={() => {
          setcreate_category(false);
          fetchCategory();
          toast.success('Thêm danh mục thành công!');
        }} />
      </Modal>
      <Modal
        title="Edit Category"
        centered
        open={editform}
        onCancel={() => {
          setEditCategory(null);
          seteditform(false);
        }}
        footer={null}
      >
          <UpdateCategory editCategory={editCategory} onSuccess={() => {
            seteditform(false);
            fetchCategory();
            toast.success('Cập nhật thành công!');
          }}/>
      </Modal>
    </div>
  );
};

export default Category;
