import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Input, Pagination, Rate, message, Space, Popconfirm, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Để sử dụng Link cho đường dẫn

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(1);
  const [filterProductId, setFilterProductId] = useState('');
  const [filterRating, setFilterRating] = useState(0); 

  useEffect(() => {
    if( !filterRating && !filterProductId){
      fetchComments(currentPage);
    }
    else{

    }
  }, [currentPage, filterRating, filterProductId]); 

  const fetchComments = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/comment/get?page=${page}&size=${pageSize}`, {
        params: {
          product_id: filterProductId, // Gửi mã sản phẩm khi lọc
          rating: filterRating, // Gửi rating khi lọc
        },
      });
      setComments(response.data.list);
      setTotal(response.data.total);
    } catch (error) {
      message.error('Không thể lấy dữ liệu bình luận.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsbyproductandrating = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/comment/get?page=${page}&size=${pageSize}`, {
        params: {
          product_id: filterProductId, // Gửi mã sản phẩm khi lọc
          rating: filterRating, // Gửi rating khi lọc
        },
      });
      setComments(response.data.list);
      setTotal(response.data.total);
    } catch (error) {
      message.error('Không thể lấy dữ liệu bình luận.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.comment);
    setNewRating(comment.rating);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/comment/delete/${id}`);
      message.success('Xóa bình luận thành công!');
      fetchComments();
    } catch (error) {
      message.error('Lỗi khi xóa bình luận!');
    }
  };

  const handleSave = async () => {
    try {
      const updatedComment = {
        ...editingComment,
        comment: newComment,
        rating: newRating,
      };
      await axios.put(`/api/comments/${editingComment._id}`, updatedComment);
      message.success('Cập nhật bình luận thành công!');
      setIsModalVisible(false);
      fetchComments();
    } catch (error) {
      message.error('Lỗi khi cập nhật bình luận!');
    }
  };

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'product_id',
      key: 'product_id',
      render: (productId) => (
        <Link to={`/product/${productId}`} target="_blank">
          {productId}
        </Link>
      ),
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (userId) => (
        <Link to={`/user/${userId}`} target="_blank">
          {userId}
        </Link>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled value={rating} />,
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
      key: 'comment',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ngày đánh giá',
      dataIndex: 'review_date',
      key: 'review_date',
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Xem">
            <EyeOutlined
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa bình luận này?"
              onConfirm={() => { handleDelete(record._id); }}
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
      <h2>Danh sách bình luận</h2>

      {/* Bộ lọc theo mã sản phẩm và đánh giá */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          value={filterProductId}
          onChange={(e) => setFilterProductId(e.target.value)}
          placeholder="Nhập mã sản phẩm để lọc"
          style={{ width: 200 }}
        />
        <Rate
          value={filterRating}
          onChange={setFilterRating}
          allowClear
          style={{ marginLeft: 10 }}
        />
        <Button onClick={() => fetchComments()} type="primary">
          Lọc
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={comments}
        rowKey="_id"
        loading={loading}
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

      <Modal
        title="Chỉnh sửa bình luận"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input.TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          placeholder="Nhập bình luận"
        />
        <Rate value={newRating} onChange={setNewRating} />
      </Modal>
    </div>
  );
};

export default CommentManagement;
