import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Divider, Tooltip, Popconfirm, Image, Pagination, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import CreateInventory from './CreateInventory';
import EditInventory from './EditInventory';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventory = ({ product_id }) => {
  const [listInventory, setListInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [createInventory, setCreateInventory] = useState(false);
  const [editform, seteditform] = useState(false);
  const [inventopryid, setinventopryid] = useState('');

  useEffect(() => {
    setListInventory(null)
    fetchInventories(currentPage);
    
  }, [product_id,currentPage]);

  const fetchInventories = async (page = currentPage) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/product/${product_id}/inventory/get`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      setListInventory(res.data.list);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res =  await axios.delete(`http://localhost:4000/api/product/${product_id}/inventory/delete/${_id}`);
        fetchInventories(currentPage);
        toast.success("Xóa thành công!")
    } catch (error) {
        toast.success("Lỗi khi xóa ")
        console.error("Lỗi khi xóa:", error);
    }
};


  const columns = [
    {
      title: '',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => (
        <Image style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={text} />
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toFixed(2)} VNĐ`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_updated',
      key: 'last_updated',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined
              onClick={() => {
                setinventopryid(record._id);
                seteditform(true);
              }}
              style={{ color: 'blue', cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
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
    <div>
      <Divider>Inventory List</Divider>

      <Table
        columns={columns}
        dataSource={listInventory}
        rowKey={(record) => record._id}
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setCreateInventory(true)}
        >
          Thêm sản phẩm tồn
        </Button>
      </div>

      <Modal
        title="Chỉnh sửa tồn kho"
        centered
        open={editform}
        onOk={() => {
          seteditform(false);
          setinventopryid('');
        }}
        onCancel={() => {
          seteditform(false);
          setinventopryid('');
        }}
      >
        <EditInventory productId = {product_id} inventoryId={inventopryid} onSuccess={() => {
          seteditform(false);
          setinventopryid('');
          fetchInventories();
        }} />
      </Modal>

      <Modal
        title="Thêm hàng tồn kho"
        centered
        open={createInventory}
        onOk={() => {
          setCreateInventory(false)
        }}
        onCancel={() => {
          setCreateInventory(false)
        }}
      >
        <CreateInventory productId={product_id} onSuccess={() => {
          setCreateInventory(false);
          fetchInventories();
        }} />
      </Modal>
    </div>
  );
};

export default Inventory;
