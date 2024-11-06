import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from 'antd';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create_category = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:4000/api/category/add', {
                category_name: values.category_name  
            });

            form.resetFields();
            //toast.success('Thêm thành công!');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
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
        <div>
            <Form
                form={form}
                name="create-category"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên danh mục"
                    name="category_name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Create_category;
