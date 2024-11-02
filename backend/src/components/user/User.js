import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Popconfirm, Tooltip , Modal, Button} from 'antd';
import { EyeOutlined, DeleteOutlined ,UserAddOutlined} from '@ant-design/icons'; 
import UserInfo from './UserInfo';
import CreateUser from './CreateUser';
const User = () => {
    const [listUser, setlistUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); 
    const [total, setTotal] = useState(0); 

    const [userid,setuserid] = useState('');
    const [userinfo , setuserinfo] = useState(false);

    const [creatuser,setcreateuser] = useState(false);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page = currentPage) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/user/getAllUser?page=${page}&size=${pageSize}`, {
                headers: {
                    'Cache-Control': 'no-cache', 
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
            setlistUser(res.data.users);
            setTotal(res.data.total); 
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleDelete = async (user_id) => {
        try {
            await axios.delete(`http://localhost:4000/api/user/deleteUser/${user_id}`);
            setlistUser(listUser.filter(user => user.user_id !== user_id)); // Loại bỏ user đã bị xóa khỏi danh sách
            console.log("Xóa user thành công:", user_id);
        } catch (error) {
            console.error("Lỗi khi xóa user:", error);
        }
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Tooltip title="Xem">
                        <EyeOutlined 
                            style={{ color: '#1890ff', cursor: 'pointer' }} 
                            onClick={() => 
                            {setuserinfo(true)
                              setuserid(record.user_id)
                            }} 
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa người dùng này?"
                            onConfirm={() => handleDelete(record.user_id)}
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
            <h2>User List</h2>
            <Table
                dataSource={listUser}
                columns={columns}
                rowKey="user_id" 
                pagination={false} 
            />
            <Pagination
                align="end"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={(page) => {
                    setCurrentPage(page);
                }} 
                style={{ marginTop: 16 }} 
            />


            <div className="d-flex justify-content-center mt-3">
           
            <Button  type="primary" icon={<UserAddOutlined/>} size="large" onClick={()=>{setcreateuser(true)}}>ADD USER</Button>
            </div>
      <Modal
        title="User"
        centered
        open={userinfo}
        onOk={() => setuserinfo(false)}
        onCancel={() => setuserinfo(false)}
      >
       <UserInfo userid={userid}/>
      </Modal>

      <Modal
        title="Create User"
        centered
        open={creatuser}
        onCancel={() => setcreateuser(false)}
        footer={null}
      >
       <CreateUser/>
      </Modal>
        </div>
    );
};

export default User;
