import React, { useEffect, useState } from 'react'
import { Form, Select, Button, Input } from 'antd'
import axios from 'axios';


const CreateUser = () => {
    const [form] = Form.useForm(); // Sử dụng hook form của Ant Design
    const [loading, setLoading] = useState(false);
    const [newuser, setnewuser] = useState(null);
    const [roles, setroles] = useState([]);

    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/role/getAllRole`);
            setroles(res.data.listRole);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async ()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/role/getAllRole`);
            setroles(res.data.listRole);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container mt-4">
            <Form
                form={form}
                name="create-user"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish=""
                autoComplete="off"
            >
                <Form.Item
                    label="Tên người dùng"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phonenumber"
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phân quyền"
                name="">
                    <Select>
                        {roles.map(item => (
                            <Select.Option key={item.role_id} value={item.role_name}>{item.role_name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateUser
