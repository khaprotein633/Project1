import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = ({ edituser, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
        if (edituser) {
            form.setFieldsValue({  // Chỉnh sửa từ setFieldValue thành setFieldsValue
                name: edituser.name,
                email: edituser.email,
                password: edituser.password,
                address: edituser.address,
                phonenumber: edituser.phonenumber, // Sửa lại từ edituser.address thành edituser.phonenumber
                role_id: edituser.role_id,
            });
        }
    }, [edituser]);

    const fetchRoles = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/role/get');
            setRoles(res.data.listRole);
        } catch (err) {
            console.log(err);
            toast.error('Lỗi khi lấy danh sách phân quyền!');
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Gửi dữ liệu dưới dạng object bình thường
            const res = await axios.put(`http://localhost:4000/api/user/update/${edituser._id}`, values);

            // Reset form nếu thành công
            form.resetFields();
            if (onSuccess) {
                onSuccess();
            }
            toast.success('Cập nhật thành công!');

        } catch (err) {
            // Hiển thị lỗi chi tiết từ API nếu có
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Có lỗi xảy ra!');
            } else {
                toast.error('Có lỗi xảy ra!');
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <Form
                form={form}
                name="update-user"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
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
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phonenumber"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phân quyền"
                    name="role_id"
                    rules={[{ required: true, message: 'Vui lòng phân quyền cho người dùng!' }]}
                >
                    <Select>
                        {roles.map(item => (
                            <Select.Option key={item._id} value={item._id}>{item.role_name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật người dùng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUser;
